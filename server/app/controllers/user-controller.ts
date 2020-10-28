import { Request, Response, NextFunction } from "express";
import express = require('express');
var router: express.Router = express.Router()
import recaptcha from "../config/recaptcha";
import * as UserModel from "../models/user-model";
import { jwtAuthorizeUserMiddleWare } from "../utils/JsonWebToken";
import UserAccessMiddleWare from "../utils/user-access-middleware";
import { USER_ROLES, MONGO_DB_URL, RATE_LIMIT_CONFIRMATION_WINDOW, RATE_LIMIT_CONFIRMATION_MAX, MAX_FILE_SIZE_LIMITS, MAX_LENGTH } from "../utils/Constants";
import { uploadProfilePic, uploadDocument } from "../utils/Uploader";
import { employerUpdateValidator, employerRegisterValidator, userRegisterValidator, userUpdateValidator } from "../utils/Validators/user-controller-validator";
import { validationResultMiddleWare } from "../middleware/validator-middleware";
import { Users } from "config/mongo";

const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');

/**
 * For limiting amount of verifying tries
 */
const limiter = new RateLimit({
    store: new MongoStore({
      // see Configuration
      uri: MONGO_DB_URL,
      expireTimeMs: RATE_LIMIT_CONFIRMATION_WINDOW
    }),
    max: RATE_LIMIT_CONFIRMATION_MAX,
    windowMs: RATE_LIMIT_CONFIRMATION_WINDOW,
    skipSuccessfulRequests: true
  });

// for user to get their own profile information
router.post('/',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer, USER_ROLES.employee]), function (req: Request | any, res: Response) {
    UserModel.getUser(req, res);
})

// to remove user 
router.delete('/',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer, USER_ROLES.employee]), function (req: Request | any, res: Response) {
    UserModel.removeUser(req, res);
})

// for user to get employer information in job search
router.get('/employer/:id' , function (req: Request | any, res: Response) {
    UserModel.getCompanyInformation(req, res);
})

/**
 * For updating userinformation
 */
router.put('/',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]), userUpdateValidator, validationResultMiddleWare,function (req: Request | any, res: Response) {
    UserModel.updateUser(req, res);
})

/**
 * For updating employer informations
 */
router.put('/employer',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer]),employerUpdateValidator,validationResultMiddleWare, function (req: Request | any, res: Response) {
    UserModel.updateUser(req, res);
})

/**
 * For adding employer profile pic
 */
router.put('/employer/profile-pic',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer]), uploadProfilePic.single('image'),function (req: Request | any, res: Response) {
    UserModel.updateEmployerProfilePicture(req, res);
})

/**
 * For adding employee attacment
 */
router.post('/employee/attachments',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]),async function (req: Request, res: Response, next: NextFunction) {

    const user = await Users.findOne({_id: res.locals.decodedCredentials.data.id}).exec();

    if(user && user.userProfile.attachments.length <  MAX_LENGTH.employee.attachments){
        const upload = uploadDocument.single('document');
        upload(req, res, (e:any) => {
            if (e) {
                req['log'].warn(e, 'UPLOAD_EMPLOYEE_ATTACHMENT');
                return res.sendStatus(422);
            }

            next();
        })
    }else{
        res.sendStatus(422);
    }
}, UserModel.addEmployeeAttachment)


/**
 * For getting employer attacments
 */
router.get('/employee/attachments',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]),async function (req: Request, res: Response, next: NextFunction) {
    UserModel.getEmployeeAttachments(req, res);
})

/**
 * For deleting attachment
 */
router.delete('/employee/attachments/:id',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]),async function (req: Request, res: Response, next: NextFunction) {
    UserModel.deleteEmployeeAttachment(req, res);
})


/**
 * For deleting employer profile pic
 */
router.delete('/employer/profile-pic',jwtAuthorizeUserMiddleWare,function (req: Request | any, res: Response) {
    UserModel.deleteEmployerProfilePicture(req, res);
})



// define the about route
router.post('/register/employer', recaptcha.middleware.verify, employerRegisterValidator, validationResultMiddleWare, function (req: Request | any, res: Response) {
    if (!req.recaptcha.error) {
        // success code
        UserModel.register(req, res);
    } else {
        // error code
        res.status(422).send({message: 'error'})
    }
})

/**
 * Register job seeker
 */
router.post('/register/employee', recaptcha.middleware.verify, userRegisterValidator, validationResultMiddleWare,function (req: Request | any, res: Response) {
    console.log(JSON.stringify(req.recaptcha));
    if (!req.recaptcha.error) {
        // success code
        UserModel.registerJobSeeker(req, res);
    } else {
        // error code
        return res.sendStatus(422);
    }
})

/**
 * Verify user's email
 */
router.post('/verify-email',limiter, function (req: Request | any, res: Response) {
    UserModel.verifyEmail(req, res);
})

/**
 * Resend verification token for uset to verify email
 */
router.post('/resend-email-verification',function (req: Request | any, res: Response) {
    UserModel.resendEmailVerification(req, res);
})

/**
 * Forgot password
 */
router.post('/forgot-password',function (req: Request | any, res: Response) {
    UserModel.sendPasswordResetToken(req, res);
})

/**
 * Reset forgotten password
 */
router.post('/reset-password',function (req: Request | any, res: Response) {
    UserModel.ResetPassword(req, res);
})

/**
 * Change password
 */
router.post('/change-password'/*, recaptcha.middleware.verify*/ ,jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer, USER_ROLES.employee]),function (req: Request | any, res: Response) {
    //if (!req.recaptcha.error) {
        // success code
        UserModel.ChangePassword(req, res);
    //} else {
        // error code
        //console.log("Captcha doesnt match");
    //}
})

/**
 * Get total amount of  users & companys info for frontpage
 */
router.get('/info' ,function (req: Request | any, res: Response) {
    UserModel.GetUserAndCompanyAmount(req, res);
})

/**
 * Get total amount of countries
 */
router.get('/info/jobs' ,function (req: Request | any, res: Response) {
    UserModel.GetJobAmount(req, res);
})

/**
 * check if user exists
 */
router.get('/exists/:email' ,function (req: Request | any, res: Response) {
    UserModel.UserExists(req, res);
})

export default router;

