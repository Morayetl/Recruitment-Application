import userController from './controllers/user-controller';
import categoryController from './controllers/category-controller';
import productController from './controllers/product-controller';
import jobController from './controllers/job-controller';
import codesetController from './controllers/codeset-controller';
import countryController from './controllers/country-controller';
import resumeController from './controllers/resume-controller';
import paymentController from './controllers/payment-controller';
import jobAlertController from './controllers/job-alert-controller';
import fileController from './controllers/protected-file-controller';
import * as UserModel from "./models/user-model";

import { Request, Response } from "express";
import { jwtAuthorizeUserMiddleWare } from './utils/JsonWebToken';
import UserAccessMiddleWare from './utils/user-access-middleware';
import sftp from './config/sftp';
import { USER_ROLES, RATE_LIMIT_USER_LOGIN_WINDOW, RATE_LIMIT_USER_LOGIN_MAX, MONGO_DB_URL, SFTP_BASE_PATH } from './utils/Constants';

const express = require('express')
const router = express.Router();

const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
 
const limiter = new RateLimit({
  store: new MongoStore({
    // see Configuration
    uri: MONGO_DB_URL,
    expireTimeMs: RATE_LIMIT_USER_LOGIN_WINDOW
  }),
  max: RATE_LIMIT_USER_LOGIN_MAX,
  windowMs: RATE_LIMIT_USER_LOGIN_WINDOW,
  skipSuccessfulRequests: true
});
 
router.use('/protected', fileController);

// sends public files 
router.use('/public/:filename', async function(req:Request, res:Response){
  const buffer = await sftp.get(SFTP_BASE_PATH + '/public/' + req.params.filename);
  return res.send(buffer);
});

router.use('/job-alert', jobAlertController);
router.use('/payment', paymentController);
router.use('/user', userController);
router.use('/category', categoryController);
router.use('/jobs', jobController);
router.use('/codeset', codesetController);
router.use('/country', countryController);
router.use('/resume',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]),  resumeController);
router.use('/products',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.admin]),  productController);

router.get('/', function (req: Request, res: Response) {});

router.post('/login',limiter, function (req: Request | any, res: Response) {
  UserModel.loginUser(req, res);
})

module.exports = router;