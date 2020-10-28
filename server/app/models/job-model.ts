import { Response, Request, application } from "express";
import _ from 'lodash';
import { Job } from "../interfaces/Job";
import connection from "../config/mysql";
import { Users, Jobs, Applications } from "../config/mongo";
import { Application } from "../interfaces/Application";
import { deleteJob } from "utils/Queries/mongo-user-account-queries";
import { COMPANY_URL_BACKEND } from "utils/Constants";
import { Attachment } from "interfaces/User";
import moment = require("moment");

const Transaction = require("mongoose-transactions");

export async function SearchJobs(req: Request, res: Response) {

  try{
    res.send({
      jobFound: true,
      total: 0,
      data: []
    });
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_SEARCHJOBS']);
    res.status(500).send('error');
  }
}

export async function GetFrontPageJobs(req: Request, res: Response) {

  try{
    const project = {
      _id: 1,
      title: 1,
      creator: 1,
      location: 1,
      jobType: 1
    };

    // if there isnt enough latest jobs in location that user gave search for random jobs

    const latestJobs = await Jobs.aggregate([
      {
        $match:{
          startDate: {
            $lte: new Date()
          },
          endDate : {
            $gte: new Date()
          }
        }
      },
      { 
        $sample: { size: 8 } 
      },
      {
        $project: project
      },
      { 
        $limit: 8 
      }
    ]).exec();
  
    
    res.send(latestJobs);
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_SEARCH_JOBS']);
    res.sendStatus(500);
  }

}

export async function DeleteJob(req: Request, res: Response) {
  try{
    await Jobs.deleteOne({_id:req.params.id ,creator: res.locals.decodedCredentials.data.id}).exec();
    res.sendStatus(200);
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_DELETE_JOB']);
    res.sendStatus(500);
  }
}

/**
 * Show job details in jobs page
 * @param req 
 * @param res 
 */
export async function GetJobDetails(req: Request, res: Response) {

  try{
    let job = await Jobs.findOne({_id: req.params.id},{description: 1, jobType: 1, phoneNumber: 1, contactPerson: 1, tags: 1, endDate: 1, location: 1, category: 1, url: 1}).exec();
    if(!job){
      return res.sendStatus(404);
    }

    let data = {
        ...job.toJSON(),
        location: await getLocationById(job.toJSON().location)
      };
    res.send(data);
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_GET_JOB_DETAILS']);
    res.sendStatus(500);
  }
}

/**
 * Get jobs that employed added
 * @param req 
 * @param res 
 */
export async function GetEmployerJobs(req: Request, res: Response) {
  const search_query = req.query.query ? decodeURIComponent(req.query.query) : null;
  
  let match:any = {
    creator: res.locals.decodedCredentials.data.id
  }
  
  if(search_query){
    const splittedQuery: Array<String> = search_query ? search_query.split(' ') : [];
    const queryRegex = new RegExp(splittedQuery.join("|"), 'i');
    match.title = { $regex: queryRegex };
  }

  try{
    
    const jobs = await Jobs.aggregate([
      {
        $match: match
      },
      {
        $project: {
          creator: 1,
          title:  1,
          startDate: 1,
          endDate: 1,
          status: { $and: [ { $lte: [ "$startDate", new Date() ] }, { $gte: [ "$endDate", new Date() ] } ] },
          applicationProcessExpiringDate: 1
        }
      },
      { 
        $sort: 
        { 
            //sort by newest first
            status: -1
        } 
      },
      {
        $addFields: {
          status: { $cond: [ '$status', 'active', 'inactive' ] }
        }
      }
    ]);
    
    if(!jobs){
      res.send([]);
    }

    let data = await Promise.all(getExtraData(jobs)) as Array<Job>;
    const dataWithAppliers = await Promise.all(data.map(async (value) => {
      const appliers = await Applications.countDocuments({jobId: value._id}).exec();
      return {...value, appliers}
    }));
    res.send(dataWithAppliers);

  }catch(e){
    req['log'].error([e, 'JOB_MODEL_GET_EMPLOYER_JOBS']);
    res.sendStatus(500);
  }

}

export async function GetEmployerJobsByJobId(req: Request, res: Response) {

  try{
    const job = await Jobs.findOne({
          creator:  res.locals.decodedCredentials.data.id,
          _id:  req.params.id
        }).exec();

      if(job){
        res.send(job);
      }else{
        res.sendStatus(404);
      }
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_GET_EMPLOYER_JOBS_BY_ID']);
    res.sendStatus(500);
  }

}

/**
 * Update employer job by job id
 * @param req 
 * @param res 
 */
export async function UpdateEmployerJobsByJobId(req: Request, res: Response) {
  try{
      await Jobs.updateOne({
          creator:  res.locals.decodedCredentials.data.id,
          _id:  req.params.id
        },
        req.body).exec();
      res.sendStatus(200);
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_UPDATE_EMPLOYER_JOB_BY_JOB_ID']);
    res.sendStatus(500);
  }
}

/**
 * Delete employer job by job id
 * @param req 
 * @param res 
 */
export async function DeleteEmployerJobsByJobId(req: Request, res: Response) {
  const id = req.params.id;
  const transaction = new Transaction();
  try{
      // only deletes employers own jobs
      const newTa = await deleteJob(id, res.locals.decodedCredentials.data.id, transaction);
      await newTa.run()
      res.sendStatus(200);
  }catch(e){
      await transaction.rollback()
      req['log'].error([e, 'JOB_MODEL_DELETE_EMPLOYER_JOBS_BY_JOB_ID']);
      res.sendStatus(500);   
  }
}

/**
 * gets applied jobs
 * @param req 
 * @param res 
 */
export async function GetEmployeeAppliedJobs(req: Request, res: Response) {

  try{
    const applications = await Applications.aggregate([{ $match: {applier: res.locals.decodedCredentials.data.id}}]).exec()
    
    if(applications){
      const promise = Promise.all(applications.map(async function(application:Application){
        const job:any = await Jobs.findById(application.jobId).exec();
        const location:string = await getLocationById(job.location);
        return {...application, title: job.title, location: location }
      }));
      
      promise.then(data =>{
        return res.send(data);
      })
      
    }else{
      return res.send([]);
    }
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_GET_EMPLOYEE_APPLIED_JOBS']);
    res.sendStatus(500);
  }
}

/**
 * lets employee to apply to job
 * @param req 
 * @param res 
 */
export async function ApplyToJob(req: Request, res: Response) {
  const app:Application = req.body;

  try{
    const job = await Jobs.findOne({_id: req.params.id, endDate: {$gt: new Date()}}).exec();

    if(!job){
      return res.status(404);
    }

    app.applier = res.locals.decodedCredentials.data.id;
    app.jobId = req.params.id;
    app.creator = job.creator;

    // lets make sure that this two are false
    app.seen = false;
    app.shortlisted = false;

    const application = new Applications(app);
    await application.save();
    res.sendStatus(200);
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_APPLY_TO_JOB']);
    res.sendStatus(500);
  }
  
}

/**
 * gets job applications
 * @param req 
 * @param res 
 */
export async function GetJobApplications(req: Request, res: Response) {
  try{
    res.send({
      total: 0,
      jobId: '',
      jobTitle: '',
      data: []
    });
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_GET_JOB_APPLICATIONS']);
    res.sendStatus(500);
  }


}

/**
 * gets applicant
 * @param req 
 * @param res 
 */
export async function GetJobApplicant(req: Request, res: Response) {
  const jobId = req.query.jobId;
  const userId = req.query.userId;
  const employerId = res.locals.decodedCredentials.data.id;

  try{
    const application = await Applications.findOne({jobId: jobId, applier:  userId}).exec();

    if(!application){
      return res.sendStatus(404);
    }

    const job = await Jobs.findOne({_id:application.jobId}).exec();

    // check if job creator matches with employer id
    if(job && employerId === job.creator){

      const applier = await Users.findOne({_id: application.applier}, {'userProfile': 1, 'resume': 1, 'email': 1}).exec();

      if(applier){

        const attachments = applier.toJSON().userProfile.attachments.map((attachment:Attachment) =>{
          return {
            ...attachment,
            url: COMPANY_URL_BACKEND + '/api/protected/'+ attachment.name + '?id=' + applier._id,
            uid: attachment._id,
            name: attachment.originalName
          }
        })

        let user = {
          ...applier.toJSON()
        }

        user.userProfile.attachments = attachments;

        const data =  {
          ...user,
          coverLetter: application.coverLetter,
          shortlisted: application.shortlisted,
          location: await getLocationById(applier.userProfile.location),
          age:  applier.userProfile.birthday ? moment().diff(applier.userProfile.birthday, 'years', false) : null
        }                
        // mark application as seen
        application.seen = true;
        await application.save();
        res.send(data);
      }
    }else {
      return res.sendStatus(401);
    }

  }catch(e){
    req['log'].error([e, 'JOB_MODEL_GET_JOB_APPLICANT']);
    res.sendStatus(500);
  }


}

/**
 * Deletes one job that employee employee applied to
 * @param req 
 * @param res 
 */
export async function DeleteEmployeeAppliedJob(req: Request, res: Response) {
  try{
    await Applications.deleteOne({
          applier:  res.locals.decodedCredentials.data.id,
          _id:  req.params.id
        }).exec();

    res.sendStatus(200);
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_DELETE_EMPLOYEE_APPLIED_JOB']);
    res.sendStatus(500);   
  }
}

/**
 * check if employee has applied to a job
 * @param req 
 * @param res 
 */
export async function HasAppliedToJob(req: Request, res: Response) {

  try{
    const count = await Applications.countDocuments({
      applier: res.locals.decodedCredentials.data.id, 
      jobId :req.params.id
    }).exec();

    if(count){
      res.send({hasApplied: true})
    }else{
      res.send({hasApplied: false})
    }
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_HAS_APPLIED_TO_JOB']);
    res.sendStatus(500);
  }
}

/**
 * check if employee has applied to a job
 * @param req 
 * @param res 
 */
export async function ShortlistApplicant(req: Request, res: Response) {

  try{
    const candidate = await Applications.findOne({
      creator: res.locals.decodedCredentials.data.id, 
      applier :req.query.applierId,
      jobId: req.query.jobId
    }).exec();

    if(!candidate){
      return res.sendStatus(404);
    }

    const shortlisted = !candidate.shortlisted;
    candidate.shortlisted = shortlisted;
    await candidate.save();
    return res.send(shortlisted);
  }catch(e){
    req['log'].error([e, 'JOB_MODEL_SHORTLIST_APPLICANT']);
    res.sendStatus(500);
  }
}

/**
 * 
 * @param jobs 
 */
function getExtraData(jobs: Array<Job>){
  const results = jobs.map((value:Job) => {
    return new Promise(async (resolve, reject) => {      
      
      let source: Job = value;


      const user = await Users.findOne({_id: source.creator},{'password': 0}).exec();

      let creator = {};
      if(user && user.companyProfile){
        creator = {
          name: user.companyProfile.name,
          id:   user._id,
          // add url for image
          image: user.companyProfile.image ? COMPANY_URL_BACKEND + '/api/public/' + user.companyProfile.image : null
        }
        source.creator = creator;
      }

      if(source.location){
        const splittedValue = source.location.split('/');
        const type = splittedValue[0];
        let query = ``;
        const id = parseInt(splittedValue[1]);      
        switch(type){
          case 'state':
            query=`Select concat(states.name,', ',country.name) as name from states
              left join countries country on states.country_id=country.id
              where states.id=${id}`;
            break;
          case 'city':
            query=`Select concat(city.name,', ',state.name,', ',country.name) as name from cities city 
            left join countries country on city.country_id=country.id
            left join states state on city.state_id=state.id
            where city.id=${id}`;
            break;
          case 'country':
            query=`Select country.name from countries country where id=${id}`;                    
            break;
        }

        connection.query(query,
          function (error: any, results: any, fields: any) {
          if (error) throw error;

          if (results) {
            return resolve({...source, location: results[0].name, creator });
          } else {
            return reject();
          }
        });     
      }else {
        return resolve({...source, creator});
      }
    })
  });


  return results;
}

function getLocationById(location:string): Promise<string>{
  return new Promise(async(resolve,reject) => {
      const splittedValue = location.split('/');
      const type = splittedValue[0];
      let query = ``;
      const id = parseInt(splittedValue[1]);      
      switch(type){
        case 'state':
          query=`Select concat(states.name,', ',country.name) as name from states
            left join countries country on states.country_id=country.id
            where states.id=${id}`;
          break;
        case 'city':
          query=`Select concat(city.name,', ',state.name,', ',country.name) as name from cities city 
          left join countries country on city.country_id=country.id
          left join states state on city.state_id=state.id
          where city.id=${id}`;
          break;
        case 'country':
          query=`Select country.name from countries country where id=${id}`;                    
          break;
      }

      connection.query(query,
        function (error: any, results: any, fields: any) {
        if (error) throw error;

        if (results) {
          return resolve(results[0].name);
        } else {
          return reject();
        }
      });     
  });
}