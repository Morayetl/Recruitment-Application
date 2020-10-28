import { body, ValidationChain, check } from "express-validator";
import { MAX_LENGTH } from "../Constants";
import { careerLevelValidator, jobTypeValidator, locationValidator, qualificationValidator, jobStartDateValidator, phoneNumberValidator, paymentPackageValidator, descriptionSanitizer } from "./validators";

/**
 * Validation for posting the job
 */
export const paymentControllerValidator: Array<ValidationChain> = [
    check('payment_method_nonce').isString().not().isEmpty().trim(),
    check('showInFrontPage').isBoolean().toBoolean().optional(),
    check('total').not().isEmpty(),

    body('job.address').isLength({max: MAX_LENGTH.address}).not().isEmpty().trim(),
    body('job.careerLevel').isNumeric().toInt().custom(careerLevelValidator).not().isEmpty().trim(),
    body('job.contactPerson').isLength({max: MAX_LENGTH.job.contactPerson}).not().isEmpty().trim(),
    body('job.description').isLength({max: MAX_LENGTH.job.description}).not().isEmpty().trim().customSanitizer(descriptionSanitizer),
    body('job.email').isLength({max: MAX_LENGTH.email}).isEmail().not().isEmpty().trim(),
    body('job.jobType').isNumeric().toInt().custom(jobTypeValidator).not().isEmpty().trim(),
    body('job.location').custom(locationValidator).not().isEmpty().trim(),
    body('job.phoneNumber').custom(phoneNumberValidator).not().isEmpty(),
    body('job.qualification').isNumeric().toInt().custom(qualificationValidator).optional().trim(),
    body('job.showFeatured').isBoolean().toBoolean().optional(),
    body('job.startDate').toDate().not().isEmpty().custom(jobStartDateValidator).trim(),
    body('job.tags').isLength({max: MAX_LENGTH.job.tags}).isArray({max: MAX_LENGTH.job.tagsArrayLimit}).optional().trim(),
    body('job.url').isLength({max: MAX_LENGTH.url}).optional().trim()
];

/**
 * Validation for posting the job
 */
export const packagePaymentControllerValidator: Array<ValidationChain> = [
    check('payment_method_nonce').isString().trim().optional(),
    check('showInFrontPage').isBoolean().toBoolean().optional(),
    check('total').not().isEmpty(),

    body('selectedJobPackageId').not().isEmpty().trim().custom(paymentPackageValidator),
    body('job.address').isLength({max: MAX_LENGTH.address}).not().isEmpty().trim(),
    body('job.careerLevel').isNumeric().toInt().custom(careerLevelValidator).not().isEmpty().trim(),
    body('job.contactPerson').isLength({max: MAX_LENGTH.job.contactPerson}).not().isEmpty().trim(),
    body('job.description').isLength({max: MAX_LENGTH.job.description}).not().isEmpty().trim().customSanitizer(descriptionSanitizer),
    body('job.email').isLength({max: MAX_LENGTH.email}).isEmail().not().isEmpty().trim(),
    body('job.jobType').isNumeric().toInt().custom(jobTypeValidator).not().isEmpty().trim(),
    body('job.location').custom(locationValidator).not().isEmpty().trim(),
    body('job.phoneNumber').custom(phoneNumberValidator).not().isEmpty(),
    body('job.qualification').isNumeric().toInt().custom(qualificationValidator).optional().trim(),
    body('job.showFeatured').isBoolean().toBoolean().optional(),
    body('job.startDate').toDate().not().isEmpty().custom(jobStartDateValidator).trim(),
    body('job.tags').isLength({max: MAX_LENGTH.job.tags}).isArray({max: MAX_LENGTH.job.tagsArrayLimit}).optional().trim(),
    body('job.url').isLength({max: MAX_LENGTH.url}).optional().trim()
];

