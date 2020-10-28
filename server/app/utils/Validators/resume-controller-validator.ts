import { body, ValidationChain, check, param } from "express-validator";
import { MAX_LENGTH } from "../Constants";
import { careerLevelValidator, jobTypeValidator, locationValidator, qualificationValidator, jobStartDateValidator, startDateIsBeforeEndDate } from "./validators";

/**
 * Validation for posting the job
 */
export const updateEducationValidator: Array<ValidationChain> = [
    check('degreeName').isLength({max: MAX_LENGTH.resume.name}).isString().optional().trim(),
    check('description').isLength({max: MAX_LENGTH.resume.description}).trim().optional(),
    check('endDate').toDate().optional().custom(startDateIsBeforeEndDate).trim(),
    check('qualificationLevel').isNumeric().toInt().custom(qualificationValidator).optional().trim(),
    check('schoolName').isLength({max: MAX_LENGTH.resume.name}).isString().optional().trim(),
    param('id').isString().not().isEmpty().trim(),
    check('startDate').toDate().not().isEmpty().trim()
];

export const addEducationValidator: Array<ValidationChain> = [
    check('degreeName').isLength({max: MAX_LENGTH.resume.name}).isString().optional().trim(),
    check('description').isLength({max: MAX_LENGTH.resume.description}).trim().optional(),
    check('endDate').toDate().optional().custom(startDateIsBeforeEndDate).trim(),
    check('qualificationLevel').isNumeric().toInt().custom(qualificationValidator).optional().trim(),
    check('schoolName').isLength({max: MAX_LENGTH.resume.name}).isString().optional().trim(),
    check('startDate').toDate().not().isEmpty().trim()
];

export const updateWorkExperienceValidator: Array<ValidationChain> = [
    check('companyName').isLength({max: MAX_LENGTH.resume.name}).isString().not().isEmpty().trim(),
    check('description').isLength({max: MAX_LENGTH.resume.description}).optional().trim(),
    check('endDate').toDate().optional().custom(startDateIsBeforeEndDate).trim(),
    check('startDate').toDate().not().isEmpty().trim(),
    check('title').isLength({max: MAX_LENGTH.resume.title}).isString().not().isEmpty().trim(),
    param('id').isString().not().isEmpty().trim()
];

export const addWorkExperienceValidator: Array<ValidationChain> = [
    check('companyName').isLength({max: MAX_LENGTH.resume.name}).isString().not().isEmpty().trim(),
    check('description').isLength({max: MAX_LENGTH.resume.description}).optional().trim(),
    check('endDate').toDate().optional().custom(startDateIsBeforeEndDate).trim(),
    check('startDate').toDate().not().isEmpty().trim(),
    check('title').isLength({max: MAX_LENGTH.resume.title}).isString().not().isEmpty().trim()
];

export const updateSkillsValidator: Array<ValidationChain> = [
    check('title').isLength({max: MAX_LENGTH.resume.title}).isString().not().isEmpty().trim(),
    check('rating').isFloat({min: 0.5, max: 5}).not().isEmpty(),
    check('duration').isInt({min: 1}).not().isEmpty(),

    //id is required for updating
    param('id').isString().not().isEmpty().trim()
];

export const addSkillsValidator: Array<ValidationChain> = [
    check('title').isLength({max: MAX_LENGTH.resume.title}).isString().not().isEmpty().trim(),
    check('duration').isInt({min: 1}).not().isEmpty(),
    check('rating').isFloat({min: 0.5, max: 5}).not().isEmpty()
];