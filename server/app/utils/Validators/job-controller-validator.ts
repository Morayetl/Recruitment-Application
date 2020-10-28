import { body, ValidationChain, check } from "express-validator";
import { MAX_LENGTH } from "../Constants";
import { careerLevelValidator, jobTypeValidator, locationValidator, qualificationValidator, descriptionSanitizer, phoneNumberValidator } from "./validators";
import moment = require("moment");

/**
 * Validation for updating job
 */
export const jobUpdateValidator: Array<ValidationChain> = [
    check('address').isLength({max: MAX_LENGTH.address}).not().isEmpty().trim(),
    check('careerLevel').isNumeric().toInt().custom(careerLevelValidator).not().isEmpty().trim(),
    check('contactPerson').isLength({max: MAX_LENGTH.job.contactPerson}).not().isEmpty().trim(),
    check('description').isLength({max: MAX_LENGTH.job.description}).not().isEmpty().trim().customSanitizer(descriptionSanitizer),
    check('email').isLength({max: MAX_LENGTH.email}).isEmail().not().isEmpty().trim(),
    check('jobType').isNumeric().toInt().custom(jobTypeValidator).not().isEmpty().trim(),
    check('location').custom(locationValidator).not().isEmpty().trim(),
    check('phoneNumber').custom(phoneNumberValidator).not().isEmpty(),
    check('qualification').isNumeric().toInt().custom(qualificationValidator).optional().trim(),
    check('tags').isLength({max: MAX_LENGTH.job.tags}).isArray({max: MAX_LENGTH.job.tagsArrayLimit}).optional().trim(),
    check('url').isLength({max: MAX_LENGTH.url}).optional().trim(),
    // WARNING: these field are suppose to be empty so that the user cant update them, they are special features
    check('showFeatured').isEmpty(),
    check('showInFrontPage').isEmpty(),
    check('startDate').isEmpty(),
    check('endDate').isEmpty(),

    // check that id is empty
    check('_id').isEmpty(),
];

export const jobApplicationValidator: Array<ValidationChain> = [
    check('coverLetter').isLength({max: MAX_LENGTH.application.coverletter}).not().isEmpty().trim(),
    check('startDate').toDate().not().isEmpty().custom((value)=> moment(value).isSameOrAfter(moment().set({hour:0,minute:0,second:0,millisecond:0}))).trim(),

    // this field needs to be empty because of employer sets the shortlist for their need
    check('shortlisted').isEmpty(),
];