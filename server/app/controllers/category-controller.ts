import { Request, Response } from "express";
import express = require('express');
var router: express.Router = express.Router();
import * as CategoryModel from "../models/categories-model";


router.get('/', function (req: Request | any, res: Response) {
    CategoryModel.getAllJobCategories(req, res);
})

router.post('/subcategory', function (req: Request | any, res: Response) {
    CategoryModel.getJobSubCategoryById(req, res);
})

router.get('/single', function (req: Request | any, res: Response) {
    CategoryModel.getJobCategoryById(req, res);
})


export default router;

