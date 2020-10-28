import { body, check, ValidationChain } from "express-validator";
import { MAX_LENGTH } from "../Constants";
import { jobStartDateValidator, qualificationValidator, locationValidator, careerLevelValidator, jobTypeValidator } from "./validators";

export const productControllerCalculationValidator: Array<ValidationChain> = [
    check('showFeatured').isBoolean().toBoolean().optional(),
    check('showInFrontPage').isBoolean().toBoolean().optional()
];

export const productControllerAddPackageValidator: Array<ValidationChain> = [
    body('gold.name').isString().not().isEmpty(),
    body('gold.price').isNumeric().toFloat().not().isEmpty(),
    body('gold.amountOfPost').isNumeric().toInt().not().isEmpty(),
    body('gold.amountOfFeaturedJob').isNumeric().toInt().not().isEmpty(),
    body('gold.jobDuration').isNumeric().toInt().not().isEmpty(),
    body('gold.expireTime').isNumeric().toInt().not().isEmpty(),
    body('gold.support').isBoolean().not().isEmpty(),

    body('silver.name').isString().not().isEmpty(),
    body('silver.price').isNumeric().toFloat().not().isEmpty(),
    body('silver.amountOfPost').isNumeric().toInt().not().isEmpty(),
    body('silver.amountOfFeaturedJob').not().isEmpty().isNumeric().toInt(),
    body('silver.jobDuration').isNumeric().toInt().not().isEmpty(),
    body('silver.expireTime').isNumeric().toInt().not().isEmpty(),
    body('silver.support').isBoolean().not().isEmpty(),   
    
    body('bronze.name').isString().not().isEmpty(),
    body('bronze.price').isNumeric().toFloat().not().isEmpty(),
    body('bronze.amountOfPost').isNumeric().toInt().not().isEmpty(),
    body('bronze.amountOfFeaturedJob').isNumeric().toInt().not().isEmpty(),
    body('bronze.jobDuration').isNumeric().toInt().not().isEmpty(),
    body('bronze.expireTime').isNumeric().toInt().not().isEmpty(),
    body('bronze.support').isBoolean().not().isEmpty(),    

    body('free.name').isString().not().isEmpty(),
    body('free.price').isNumeric().toFloat().not().isEmpty(),
    body('free.amountOfPost').isNumeric().toInt().not().isEmpty(),
    body('free.amountOfFeaturedJob').not().isEmpty().isNumeric().toInt(),
    body('free.jobDuration').not().isEmpty().isNumeric().toInt(),
    body('free.expireTime').not().isEmpty().isNumeric().toInt(),
    body('free.support').not().isEmpty().isBoolean(),     

    body('single.name').isString().not().isEmpty(),
    body('single.price').isNumeric().toFloat().not().isEmpty(),
    body('single.featurePrice').isNumeric().toFloat().not().isEmpty(),
    body('single.frontPagePrice').isNumeric().toFloat().not().isEmpty(),

    check('startDate').toDate().not().isEmpty().custom((startDate, { req }) => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getMonth() + 6);
        const max = maxDate.getTime();
        const start = startDate.getTime()
        if (start >= new Date().getTime() && start <= max ) {
          throw new Error('start date cant be more than 6 months old');
        }
        return true;
    })
];