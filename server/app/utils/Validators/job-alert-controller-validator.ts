import { ValidationChain, check } from "express-validator";
import { MAX_LENGTH } from "../Constants";
import { locationValidator, emailFrequencyValidator } from "./validators";

/**
 * Validation for updating job alert
 */
export const jobAlertUpdateValidator: Array<ValidationChain> = [
    check('emailFrequency').custom(emailFrequencyValidator).not().isEmpty().trim()
];

/**
 * Validation for creating job alert
 */
export const jobAlertCreateValidator: Array<ValidationChain> = [
    check('emailFrequency').custom(emailFrequencyValidator).not().isEmpty().trim(),
    check('searchWord').isLength({max: MAX_LENGTH.employee.searchWord}).not().isEmpty().trim(),
    check('location').custom(locationValidator).not().isEmpty().trim()
];