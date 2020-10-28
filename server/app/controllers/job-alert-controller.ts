import { Request, Response, NextFunction } from "express";
import express = require('express');
var router: express.Router = express.Router()
import * as JobAlertModel from "../models/job-alert-model";
import { jwtAuthorizeUserMiddleWare } from "../utils/JsonWebToken";
import UserAccessMiddleWare from "../utils/user-access-middleware";
import { USER_ROLES } from "../utils/Constants";
import { validationResultMiddleWare } from "../middleware/validator-middleware";
import { jobAlertUpdateValidator, jobAlertCreateValidator } from '../utils/Validators/job-alert-controller-validator';

/**
 * gets users alert
 */
router.get('/', jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]), function (req: Request | any, res: Response) {
    JobAlertModel.getAlerts(req, res);
})

/**
 * add alert
 */
router.post('/', jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]),jobAlertCreateValidator,validationResultMiddleWare, function (req: Request | any, res: Response) {
    JobAlertModel.addAlert(req, res);
})

/**
 * deletes alert
 */
router.delete('/:id', jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]), function (req: Request | any, res: Response) {
    JobAlertModel.removeAlert(req, res);
})

/**
 * update alert
 */
router.put('/:id', jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]),jobAlertUpdateValidator , validationResultMiddleWare, function (req: Request | any, res: Response) {
    JobAlertModel.updateAlert(req, res);
})

export default router;

