import express = require('express');
import './config/sftp';
import bodyParser from "body-parser";
import { pinoLogger} from 'utils/pino-logger';
import { COMPANY_URL } from 'utils/Constants';
import {generateMetaTags} from 'utils/MetaTags';
import { Jobs } from 'config/mongo';
import mongoose from "mongoose";
import {isGoogleBot} from "./utils/UserAgentIdentifier";

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    //console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const fs = require('fs');

  // create directory for logs if it doesnt exist
  if (!fs.existsSync('logs')){
    fs.mkdirSync('logs');
  }
  
  const app: express.Application = express();
  const server = require('http').createServer(app);
  const compression = require('compression');
  const device = require('express-device');
  
  const path = require('path');
  
  const port = process.env.EXPRESS_HOST ? process.env.EXPRESS_HOST : 8080;
  
  // Create a new express application instance
  const cors = require('cors');
  const cookieParser = require('cookie-parser');
  const whitelist: Array<string> = process.env.NODE_ENV === 'development' ? ['http://localhost:4200', 'http://angular:3000','http://localhost:8080', 'http://localhost','http://localhost:3000'] : [COMPANY_URL];
  
  const logger = pinoLogger;
  
  const corsOptions = {
    origin: function (origin: string, callback: Function) {
      // if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      // } else {
        // callback(new Error('Not allowed by CORS'))
      // }
    },
    credentials: true
  }
  

  app.disable('x-powered-by');

  app.use(device.capture({parseUserAgent: true}));

  // this get function has to be before express static to function properly
  app.get('/', function (req: express.Request & {device:any}, res, next) {
    if (req.device.type === 'bot' && !isGoogleBot(req.headers['user-agent'])) {
      //url without http:// or https://
      const url = req.get('host');
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

      //send meta tags if bot
      res.send(generateMetaTags('',url,fullUrl,''));
      // end the request
      res.end();
    } else {
      // send single page app
      next();
    }
  });

  app.use('/',express.static('public'));
  app.set('views',path.resolve('public/'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');

  app.use(compression({threshold: 0, level: 5}));
  app.use(cookieParser());
  app.use(cors(corsOptions));
  
  // add pino logges to request and response
  app.use((req:express.Request & {log}, res:any, next) => {
    req.log = res.log = logger.child({
      req:{
        hostname: req.hostname,
        method: req.method,
        url: req.url,
        cookie: req.cookies
      }
    })
    next();
  });
  
  app.use(bodyParser.json());
  
  app.get(/^\/((?!(api|jobs|logo)).)*$/, function(req: express.Request & {device:any}, res) {
    if (req.device.type === 'bot' && !isGoogleBot(req.headers['user-agent'])) {
      //url without http:// or https://
      const url = req.get('host');
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      res.send(generateMetaTags('',url,fullUrl,''));
    } else {
      // send single page app
      res.render('index.html');
    }
  });

  app.get('/jobs', async function(req: express.Request & {device:any}, res) {
    const jobId = req.query.id;

    if (req.device.type === 'bot' && !isGoogleBot(req.headers['user-agent'])) {
      // do something else, i.E. send a static page
      if(jobId && mongoose.Types.ObjectId.isValid(jobId)){
        try{
          const jobs = await Jobs.findOne({
            _id: jobId,
            startDate: {
              $lte: new Date()
            },
            endDate : {
              $gte: new Date()
            }
          });

          //url without http:// or https://
          const url = req.get('host');
          const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

          if(jobs){
            res.send(generateMetaTags(jobs.title,url,fullUrl,jobs.description));
          }else{
            res.status(404).send(generateMetaTags('Page not found',url,fullUrl,''));
          }
        }catch(e){
          req['log'].error([e,'JOBS_SEO_META']);
          res.sendStatus(500);
        }
      }
      
    } else {
      // send single page app
      res.render('index.html');
    }
  });

  app.use('/api', require('./routes'));
  
  server.listen(port);
  
}