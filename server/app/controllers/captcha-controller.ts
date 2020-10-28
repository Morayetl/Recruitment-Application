/*import { Request, Response, NextFunction } from "express";
import { IAuthInfoRequest } from '../interfaces/IAuthInfoRequest';
import express = require('express');
var router: express.Router = express.Router()
import connection from "../config/mysql"
const svgCaptcha = require('svg-captcha');


// define the home page route
router.get('/', function (req: Request | any, res: Response) {
    const captcha = svgCaptcha.create({size: 8});
    req.session.captcha = captcha.text;
    req.session.save();
    //console.log(req.session.user.captcha);
    
    res.type('svg');
    req.session.save(function(err: any) {
        if(err){
            // error message   
            //res.status(200).send(captcha.data);
        } else {          
            res.status(200).send(captcha.data);      
        }
    })
})

export default router;
*/