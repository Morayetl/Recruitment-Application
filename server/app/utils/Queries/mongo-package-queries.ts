import { Packages } from "../../config/mongo";

/**
 * gets current price of single product purchase
 */
export const getSingleProductPrices =  async () => {
    const singleProductRates = await Packages.find({startDate: {$lte: new Date()}},{ single: 1, _id: 1}, {sort:{startDate: '-1'}, limit: 1}).exec();
    if(singleProductRates && singleProductRates[0]){
        return { singleProduct: singleProductRates[0].single, packagePriceId: singleProductRates[0]._id};
    }

    const singleProductRates2 = await Packages.find({startDate: {$gte: new Date()}},{ single: 1, _id: 1}, {sort:{startDate: '1'}, limit: 1}).exec();
    if(singleProductRates2 && singleProductRates2[0]){
        return { singleProduct: singleProductRates2[0].single, packagePriceId: singleProductRates2[0]._id};
    }

    return {};
}

/**
 * Gets current pricing/deals of all products
 * @param freePackagePricing include free package informations
 */
export const getPackagePrices =  async (freePackagePricing: boolean = false, singlePackagePricing: boolean = false) => {
    let free:any = {};
    if(freePackagePricing){
        free.free = 1;  
    }

    if(singlePackagePricing){
        free.single= 1;
    }
    
    const packageDeals = await Packages.find({ startDate: {$lte: new Date()}},{ gold: 1, silver: 1, bronze: 1, _id: 1, ...free}, {sort:{startDate: '-1'}, limit: 1}).exec();

    if(packageDeals && packageDeals[0]){
        return packageDeals[0];
    }

    const packageDeals2 = await Packages.find({ startDate: {$gte: new Date()}},{ gold: 1, silver: 1, bronze: 1, _id: 1, ...free}, {sort:{startDate: '1'}, limit: 1}).exec();

    if(packageDeals2 && packageDeals2[0]){
        return packageDeals2[0];
    }

    return null;
}