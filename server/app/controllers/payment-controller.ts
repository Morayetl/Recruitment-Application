import { Request, Response } from "express";
import express = require('express');
import { jwtAuthorizeUserMiddleWare } from "../utils/JsonWebToken";
import UserAccessMiddleWare from "../utils/user-access-middleware";
import { USER_ROLES } from "../utils/Constants";
import * as PaymentModel from "../models/payment-model";


const router: express.Router = express.Router()

/**
 * Get all transactions made 
 */
router.get('/transactions', jwtAuthorizeUserMiddleWare,UserAccessMiddleWare([USER_ROLES.employer]),function (req: Request, res: Response) {
  PaymentModel.getTransactions(req,res);
});  

/**
 * Get all users purchased packages 
 */
router.get('/available-packages-for-payment', jwtAuthorizeUserMiddleWare,UserAccessMiddleWare([USER_ROLES.employer]),function (req: Request, res: Response) {
  PaymentModel.getAvailablePackagesForPayment(req,res);
});  

/**
 * Gets receipt for user
 */
router.get('/receipt/:id', jwtAuthorizeUserMiddleWare,UserAccessMiddleWare([USER_ROLES.employer]),function (req: Request, res: Response) {
  PaymentModel.getReceipt(req,res);
});  


export default router;