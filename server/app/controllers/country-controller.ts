import { Request, Response, NextFunction } from "express";
import express = require('express');
import { getCountriesAndCities, getLocationById } from "../models/country-model";
var router: express.Router = express.Router()

// define the home page route
router.get('/', function (req: Request | any, res: Response) {
    getCountriesAndCities(req,res);
})

router.post('/location', function (req: Request | any, res: Response) {
    getLocationById(req,res);
})

// router.get('/nearest-city', function (req: Request | any, res: Response) {
//     getNearestCityLocationByCordinates(req,res);
// })


export default router;