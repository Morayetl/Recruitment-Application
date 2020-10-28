import { Request, Response, NextFunction } from "express";
import express = require('express');
var router: express.Router = express.Router()
import recaptcha from "../config/recaptcha";
import * as CodesetModel from "../models/codeset-model";
import { jwtAuthorizeUserMiddleWare } from "../utils/JsonWebToken";


router.get('/', function (req: Request | any, res: Response) {
    CodesetModel.getByCodeSet(req, res);
})

router.get('/type/:type/value/:value', function (req: Request | any, res: Response) {
    CodesetModel.getByCodeSetByIdAndValue(req, res);
})

export default router;

