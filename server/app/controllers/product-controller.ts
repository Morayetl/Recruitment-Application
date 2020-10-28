import { Request, Response, NextFunction } from "express";
import express = require('express');
const router: express.Router = express.Router();
import * as ProductModel from "../models/product-model";
import { productControllerCalculationValidator, productControllerAddPackageValidator } from "../utils/Validators/product-controller-validator";


router.get('/', function (req: Request | any, res: Response) {
    ProductModel.getPackages(req, res);
})

// //TODO: admin access
// router.post('/', productControllerAddPackageValidator,function (req: Request | any, res: Response) {
//     ProductModel.addPackage(req, res);
// })

router.post('/price/:packageId', productControllerCalculationValidator,  function (req: Request | any, res: Response) {
    ProductModel.CalculatePrice(req, res);
})
router.post('/price', productControllerCalculationValidator,function (req: Request | any, res: Response) {
    ProductModel.CalculatePrice(req, res);
})

export default router;

