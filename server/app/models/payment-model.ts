import { Request, Response } from "express";
import { Jobs, Users, PurchasedItems, Transactions } from "../config/mongo";
import { Job } from "../interfaces/Job";
import { PurchasedItem, PurchasedItemsModel } from "../interfaces/PurchasedItemSchema";

/**
 * Gets transactions that user has made
 * @param req 
 * @param res 
 */
export async function getTransactions(req: Request, res: Response) {
    try{
        const transactions = await Transactions.find({userId: res.locals.decodedCredentials.data.id}).then( async transactions =>  {
            const ta = await Promise.all(transactions.map(async (transaction, index) =>{
                const job = await Jobs.findOne({_id: transaction.jobId}) || {} as Job;
                const userPackage = await PurchasedItems.findOne({_id:transaction.packageId}) || {} as PurchasedItem;
                return { 
                    key: index,
                    packageId: transaction.packageId,
                    packageName: userPackage.name,
                    title: transaction.jobTitle || job.title,
                    paymentDate: transaction.created
                }
            }));
            return ta;
        });

        res.send(transactions);
    }catch(e){
        req['log'].error([e, 'PAYMENT_MODEL_GET_TRANSACTIONS']);
        res.sendStatus(500);
    }
}

/**
 * Gets Available packages for payment
 * @param req 
 * @param res 
 */
export async function getAvailablePackagesForPayment(req: Request, res: Response) {
    try{
        let userPackages = await PurchasedItemsModel.aggregate([
            { 
                $match: {
                    userId: res.locals.decodedCredentials.data.id,
                    remaining: {
                        $gt: 0
                    }
                }
            }       
        ]).exec();

        res.send(userPackages);
    }catch(e){
        req['log'].error([e, 'PAYMENT_MODEL_GET_AVAILABLE_PACKAGES_FOR_PAYMENT']);
        res.sendStatus(500);
    }
}


/**
 * Gets Receipt
 * @param req 
 * @param res 
 */
export async function getReceipt(req: Request, res: Response | any) {
    try{
        res.send(200);
    }catch(e){
        req['log'].error([e, 'PAYMENT_MODEL_GET_RECEIPT']);
        res.sendStatus(500);
    }
}