import { Packages, PurchasedItems } from "../config/mongo";
import { Response, Request } from "express";
import { Package } from "../interfaces/Package";
import { getSingleProductPrices, getPackagePrices } from "../utils/Queries/mongo-package-queries";
import { Job } from "../interfaces/Job";
import { calculateSinglePrice, calculatePackageBasedPrice } from "../utils/price-calculator/price-calculator";
import { validationResult } from "express-validator";
import { VAT_PERCENTAGE } from "utils/Constants";

export async function getPackages(req: Request, res: Response) {
    try{
        const prices = await getPackagePrices(true, true);
        if(!prices){
            throw new Error('package prices not found');
        }
        res.send(prices);
    }catch(e){
        req['log'].error([e, 'PRODUCT_MODEL_GET_PACKAGES']);
        res.sendStatus(500);
    }
}


/**
 * Allow admin to change pricing 
 * @param req 
 * @param res 
 */
export async function addPackage(req: Request, res: Response) {
    const err = validationResult(req)
    if(!err.isEmpty()){
        res.status(422).send(err.mapped());
        return;
    }
    
    const packageData: Package = req.body;

    try{
        const packageDb = new Packages(packageData);
        await packageDb.save();
    }catch(e){
        req['log'].error([e, 'PRODUCT_MODEL_CALCULATE_PRICE']);
        res.sendStatus(500);        
    }
}

/**
 * Calculates total price of post
 * @param req 
 * @param res 
 */
export async function CalculatePrice(req: Request, res: Response) {
    try{
        const err = validationResult(req)
        if(!err.isEmpty()){
            res.status(422).send(err.mapped());
            return;
        }
        const packageId = req.params.packageId;
        const data: { job:Job, showInFrontPage: boolean} = req.body || {};
        const {singleProduct} = await getSingleProductPrices();

        if(!singleProduct){
            res.status(404).send(new Error('Resource not found'));
            return;
        }

        if(packageId){
            const userPackage = await PurchasedItems.findById(packageId).exec();
            
            if(!userPackage){
                return res.sendStatus(404);
            }

            // get product with the id that user bought the product 
            const product = await Packages.findById(userPackage.packagePriceId);
            if(!product){
                throw new Error('product not found')
            }            

            const duration = product.toJSON()[userPackage.name].jobDuration;
            const prices = {
                ...singleProduct.toJSON(),
                price: userPackage.remaining < 1 ? singleProduct.price : 0,
                name: userPackage.name,
                jobDuration: duration
            }
            const calculation = await calculatePackageBasedPrice(data, userPackage,singleProduct)
            const total = calculation.total;
            const vat = calculation.totalVat;
            res.send({total: total , vatPercentage:vat, vat: VAT_PERCENTAGE * 100,prices: prices});
        }else{
            const calculation = calculateSinglePrice(data, singleProduct);
            const total = calculation.total;
            const vat = calculation.totalVat;

            res.send({total: total , vatPercentage:vat, vat: VAT_PERCENTAGE * 100, prices: singleProduct});
        }
    }catch(e){
        req['log'].error([e, 'PRODUCT_MODEL_CALCULATE_PRICE']);
        res.sendStatus(500);
    }
}