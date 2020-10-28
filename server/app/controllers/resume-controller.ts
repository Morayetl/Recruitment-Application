import { Request, Response, NextFunction } from "express";
import express = require('express');
var router: express.Router = express.Router()
import * as ResumeModel from "../models/resume-model";
import { jwtAuthorizeUserMiddleWare } from "../utils/JsonWebToken";
import { validationResultMiddleWare } from "../middleware/validator-middleware";
import { updateEducationValidator, addEducationValidator, updateWorkExperienceValidator, addWorkExperienceValidator, updateSkillsValidator, addSkillsValidator } from "../utils/Validators/resume-controller-validator";



// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    next();
})

/**
 * gets employees resume
 */
router.get('/', jwtAuthorizeUserMiddleWare, function (req: Request | any, res: Response) {
    ResumeModel.getResume(req, res);
})

/**
 * For adding education
 */
router.post('/education',addEducationValidator, validationResultMiddleWare,function (req: Request | any, res: Response) {
    ResumeModel.AddEducation(req,res);
})

/**
 * For updating education
 */
router.put('/education/:id', updateEducationValidator, validationResultMiddleWare,function (req: Request | any, res: Response) {
    ResumeModel.UpdateEducation(req,res);
}),

/**
 * For deleting education
 */
router.delete('/education/:id', function (req: Request | any, res: Response) {
    ResumeModel.DeleteEducation(req,res);
})

/**
 * For adding work experience
 */
router.post('/work-experience',addWorkExperienceValidator, validationResultMiddleWare,function (req: Request | any, res: Response) {
    ResumeModel.AddWorkExperience(req,res);
})

/**
 * For updating experience
 */
router.put('/work-experience/:id', updateWorkExperienceValidator, validationResultMiddleWare, function (req: Request | any, res: Response) {
    ResumeModel.UpdateWorkExperience(req,res);
})

/**
 * For deleting experience
 */
router.delete('/work-experience/:id', function (req: Request | any, res: Response) {
    ResumeModel.DeleteWorkExperience(req,res);
})

/**
 * For adding a professional skill
 */
router.post('/professional-skills',addSkillsValidator , validationResultMiddleWare,function (req: Request | any, res: Response) {
    ResumeModel.AddProfessionalSkill(req,res);
})

/**
 * For updating a professional skill
 */
router.put('/professional-skills/:id',updateSkillsValidator, validationResultMiddleWare,function (req: Request | any, res: Response) {
    ResumeModel.UpdateProfessionalSkill(req,res);
})

/**
 * For deleting a professional skill
 */
router.delete('/professional-skills/:id', function (req: Request | any, res: Response) {
    ResumeModel.DeleteProfessionalSkill(req,res);
})

export default router;

