import { Request, Response, NextFunction } from "express";
import express = require('express');
const router: express.Router = express.Router()
import * as JobModel from "../models/job-model";
import { categorySearchMiddleWare } from "../middleware/category-middleware";
import { countrySearchMiddleWare } from "../middleware/country-middleware";
import UserAccessMiddleWare from "../utils/user-access-middleware";
import { USER_ROLES } from "../utils/Constants";
import { jwtAuthorizeUserMiddleWare } from "../utils/JsonWebToken";
import { validationResultMiddleWare } from "../middleware/validator-middleware";
import { jobUpdateValidator, jobApplicationValidator } from "../utils/Validators/job-controller-validator";


/**
 * search job
 */
router.post('/search', categorySearchMiddleWare, countrySearchMiddleWare,function (req: Request | any, res: Response) {
    JobModel.SearchJobs(req,res);
})


/**
 * get jobs for frontpage
 */
router.get('/search/front-page', categorySearchMiddleWare, countrySearchMiddleWare,function (req: Request | any, res: Response) {
   JobModel.GetFrontPageJobs(req,res);
})


router.delete('/job/:id',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer]), function (req: Request | any, res: Response) {
    JobModel.DeleteJob(req, res);
});


/**
 * Get employer job by id
 */
router.get('/job/:id',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer]), function (req: Request | any, res: Response) {
    JobModel.GetEmployerJobsByJobId(req, res);
});

/**
 * Get job description by id
 */
router.get('/job/:id/details', function (req: Request | any, res: Response) {
    JobModel.GetJobDetails(req, res);
});

/**
 * Get jobs that employer have posted
 */
router.get('/employer',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer]), function (req: Request | any, res: Response) {
    JobModel.GetEmployerJobs(req, res);
});

/**
 * Update employer job
 */
router.post('/job/employer/:id',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer]), jobUpdateValidator,validationResultMiddleWare,function (req: Request | any, res: Response) {
    JobModel.UpdateEmployerJobsByJobId(req, res);
});

/**
 * Delete employer job
 */
router.delete('/job/employer/:id',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer]), function (req: Request | any, res: Response) {
    JobModel.DeleteEmployerJobsByJobId(req, res);
});

/**
 * Apply to a job
 */
router.post('/job/apply/:id',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]), jobApplicationValidator,validationResultMiddleWare,function (req: Request | any, res: Response) {

    JobModel.ApplyToJob(req, res);
});

/**
 * get job applications for employer
 */
router.get('/applications',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer]), function (req: Request | any, res: Response) {
    JobModel.GetJobApplications(req, res);
});

/**
 * get job applications for employer
 */
router.get('/applicant',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer]), function (req: Request | any, res: Response) {
    JobModel.GetJobApplicant(req, res);
});

/**
 * get job applications for employer
 */
router.put('/applicant/shortlist',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employer]), function (req: Request | any, res: Response) {
    JobModel.ShortlistApplicant(req, res);
});


/**
 * Get jobs that employee applied to
 */
router.get('/employee',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]), function (req: Request | any, res: Response) {
    JobModel.GetEmployeeAppliedJobs(req, res);
});

/**
 * Delete one job that employee applied to
 */
router.delete('/employee/:id',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]), function (req: Request | any, res: Response) {
    JobModel.DeleteEmployeeAppliedJob(req, res);
});

/**
 * Checks if employee has applied to joob
 */
router.get('/employee/applied/:id',jwtAuthorizeUserMiddleWare, UserAccessMiddleWare([USER_ROLES.employee]), function (req: Request | any, res: Response) {
    JobModel.HasAppliedToJob(req, res);
});




export default router;

