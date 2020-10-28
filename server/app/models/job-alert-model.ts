import { Users, JobAlerts } from "../config/mongo";
import { Response, Request } from "express";
import { JobAlert } from "../interfaces/JobAlert";
import { getLocationNameByCode } from "utils/Mysql-queries";
import { CODESETS, EMAIL_FREQUENCY, MAX_LENGTH } from "utils/Constants";
import moment = require("moment");
import { ObjectID } from "bson";
import {calculateNextAlarm} from '../utils/Email/email-frequency';

/**
 * Gets alerts
 * @param req 
 * @param res 
 */
export async function getAlerts(req: Request, res: Response) {
    try{
        const jobAlerts = await JobAlerts.find({userId: res.locals.decodedCredentials.data.id}).exec();

        if(!jobAlerts || jobAlerts.length === 0 ){
            res.send([]);
            return;
        }

        const data = await Promise.all(jobAlerts.map(async (values) =>{
            const val = values.toJSON()
            return {
                ...val,
                location: await getLocationNameByCode(val.location)
            };
        }));

        res.send(data);
    }catch(e){
        req['log'].error([e, 'JOB_ALERT_MODEL_GET_ALERTS']);
        res.sendStatus(500);
    }
}

/**
 * Adds alert for employee
 * @param req 
 * @param res 
 */
export async function addAlert(req: Request, res: Response) {
    try{
        const data: JobAlert = req.body;

        const count = await JobAlerts.find({userId: res.locals.decodedCredentials.data.id}).countDocuments().exec();

        if(count >= MAX_LENGTH.employee.jobAlerts){
            throw new Error('Max limit of job application reached!')
        }

        let {nextAlarm} = calculateNextAlarm(data.emailFrequency);

        data.userId = res.locals.decodedCredentials.data.id;

        data.nextAlarm = nextAlarm.toDate();
        const jobAlerts = new JobAlerts(data);
        await jobAlerts.save();
        res.sendStatus(200);
    }catch(e){
        req['log'].error([e, 'JOB_ALERT_MODEL_ADD_ALERT']);
        res.sendStatus(500);
    }
}

/**
 * Removes alert
 * @param req 
 * @param res 
 */
export async function removeAlert(req: Request, res: Response) {
    const id = req.params.id;
    try{
        const alert = await JobAlerts.findOneAndDelete({_id: id, userId: res.locals.decodedCredentials.data.id }).exec();

        if(!alert){
            throw new Error('Alert wasnt found');
        }
        res.sendStatus(200);
    }catch(e){
        req['log'].error([e, 'JOB_ALERT_MODEL_REMOVE_ALERT']);
        res.sendStatus(500);
    }
}

/**
 * Adds alert for employee
 * @param req 
 * @param res 
 */
export async function updateAlert(req: Request, res: Response) {
    try{
        const data: {id: ObjectID, emailFrequency: number} = {
            ...req.body,
            ...req.params
        }

        const jobAlert = await JobAlerts.findOne({_id:data.id, userId: res.locals.decodedCredentials.data.id}).exec();

        if(!jobAlert){
            throw new Error('job alert not found!');
        }

        let { nextAlarm } = calculateNextAlarm(data.emailFrequency);

        jobAlert.emailFrequency = data.emailFrequency;
        jobAlert.nextAlarm = nextAlarm.toDate();
        await jobAlert.save();
        res.sendStatus(200);
    }catch(e){
        req['log'].error([e, 'JOB_ALERT_MODEL_UPDATE_ALERT']);
        res.sendStatus(500);
    }
}