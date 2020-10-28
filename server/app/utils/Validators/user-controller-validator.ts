import { body, check, ValidationChain } from "express-validator";
import { MAX_LENGTH, AGE_LIMIT } from "../Constants";
import { jobStartDateValidator, qualificationValidator, locationValidator, careerLevelValidator, jobTypeValidator, companySizeValidator, urlValidator, phoneNumberValidator, userExistsValidator } from "./validators";
import moment = require("moment");

/**
 * Validator for registering user
 */
export const userRegisterValidator: Array<ValidationChain> = [
    check('email').isLength({max: MAX_LENGTH.email}).isEmail().not().isEmpty().trim().custom(userExistsValidator),
    check('password').isString().isLength({max: MAX_LENGTH.password}).not().isEmpty().trim(),
    body('userProfile.address').isString().not().isEmpty().isLength({max: MAX_LENGTH.address}).trim(),
    body('userProfile.firstname').isString().not().isEmpty().isLength({max: MAX_LENGTH.name}).trim(),
    body('userProfile.lastname').isString().not().isEmpty().isLength({max: MAX_LENGTH.name}).trim(),
    body('userProfile.location').custom(locationValidator).not().isEmpty().trim(),
    body('userProfile.number').custom(phoneNumberValidator).not().isEmpty().trim(),
    body('userProfile.birthday').toDate().not().isEmpty().custom((date) => moment(date).isSameOrBefore(moment().subtract(AGE_LIMIT,'year').add(1, 'day').set({hour:0,minute:0,second:0,millisecond:0})))
];

export const userUpdateValidator: Array<ValidationChain> = [
    check('email').isLength({max: MAX_LENGTH.email}).isEmail().not().isEmpty().trim(),
    check('tags').isLength({max: MAX_LENGTH.employee.tags}).isArray({max: MAX_LENGTH.employee.tagsArrayLimit}).optional(),
    check('tags').isArray({max: MAX_LENGTH.employee.tagsArrayLimit}).optional(),
    check('tags.*').isLength({max: MAX_LENGTH.employee.tags}).optional(),
    body('userProfile.address').isString().not().isEmpty().isLength({max: MAX_LENGTH.address}).trim(),
    body('userProfile.description').isString().isLength({max: MAX_LENGTH.employee.description}).optional().trim(),
    body('userProfile.firstname').isString().not().isEmpty().isLength({max: MAX_LENGTH.name}).trim(),
    body('userProfile.jobTitle').isString().isLength({max: MAX_LENGTH.employee.jobTitle}).optional().trim(),
    body('userProfile.lastname').isString().not().isEmpty().isLength({max: MAX_LENGTH.name}).trim(),
    body('userProfile.location').custom(locationValidator).not().isEmpty().trim(),
    body('userProfile.number').custom(phoneNumberValidator).not().isEmpty().trim(),
    body('userProfile.urls.*').optional().isLength({max: MAX_LENGTH.url}).custom(urlValidator).trim(),
    body('userProfile.birthday').toDate().not().isEmpty().custom((date) => moment(date).isBefore(moment().subtract(AGE_LIMIT,'year').add(1, 'day').set({hour:0,minute:0,second:0,millisecond:0})))
];

export const employerRegisterValidator: Array<ValidationChain> = [
    check('address').isString().not().isEmpty().isLength({max: MAX_LENGTH.address}).trim(),
    check('companyId').isString().not().isEmpty().isLength({max: MAX_LENGTH.employer.companyId}),
    check('companySize').isInt().not().isEmpty().custom(companySizeValidator),
    check('email').isLength({max: MAX_LENGTH.email}).isEmail().not().isEmpty().trim().custom(userExistsValidator),
    check('establishingYear').toDate().not().isEmpty().custom((date) => moment(date).isSameOrBefore(moment().set({hour:0,minute:0,second:0,millisecond:0}).add(1,'day'))),
    check('firstname').isString().not().isEmpty().isLength({max: MAX_LENGTH.name}),
    check('homePageUrl').optional().isLength({max: MAX_LENGTH.url}).custom(urlValidator).trim(),
    check('lastname').isString().not().isEmpty().isLength({max: MAX_LENGTH.name}),
    check('location').custom(locationValidator).not().isEmpty().trim(),
    check('name').isString().not().isEmpty().isLength({max: MAX_LENGTH.companyName}),
    check('number').custom(phoneNumberValidator).not().isEmpty().trim(),
    check('password').isString().isLength({max: MAX_LENGTH.password}).not().isEmpty().trim(),
    check('birthday').toDate().not().isEmpty().custom((date) => moment(date).isSameOrBefore(moment().subtract(AGE_LIMIT,'year').add(1, 'day').set({hour:0,minute:0,second:0,millisecond:0})))
];

export const employerUpdateValidator: Array<ValidationChain> = [
    body('companyProfile.address').isString().not().isEmpty().isLength({max: MAX_LENGTH.address}).trim(),
    body('companyProfile.companyId').isString().not().isEmpty().isLength({max: MAX_LENGTH.employer.companyId}).trim(),
    body('companyProfile.companySize').isInt().not().isEmpty().custom(companySizeValidator).trim(),
    body('companyProfile.description').isString().isLength({max: MAX_LENGTH.employer.description}).optional().trim(),
    body('companyProfile.establishingYear').not().isEmpty().toDate().custom((date) => moment(date).isSameOrBefore(moment().set({hour:0,minute:0,second:0,millisecond:0}).add(1,'day'))).trim(),
    body('companyProfile.firstname').isString().not().isEmpty().isLength({max: MAX_LENGTH.name}).trim(),
    body('companyProfile.lastname').isString().not().isEmpty().isLength({max: MAX_LENGTH.name}).trim(),
    body('companyProfile.location').custom(locationValidator).not().isEmpty().trim(),
    body('companyProfile.name').isString().not().isEmpty().isLength({max: MAX_LENGTH.companyName}).trim(),
    body('companyProfile.number').custom(phoneNumberValidator).not().isEmpty().trim(),
    body('companyProfile.tags').isArray({max: MAX_LENGTH.employer.tagsArrayLimit}).optional(),
    body('companyProfile.tags.*').isLength({max: MAX_LENGTH.employer.tags}).optional(),
    body('companyProfile.urls.*').optional().isLength({max: MAX_LENGTH.url}).custom(urlValidator).trim(),
    body('companyProfile.birthday').toDate().not().isEmpty().custom((date) => moment(date).isBefore(moment().subtract(AGE_LIMIT,'year').add(1, 'day').set({hour:0,minute:0,second:0,millisecond:0}))),
    check('email').isLength({max: MAX_LENGTH.email}).isEmail().not().isEmpty().trim()
];