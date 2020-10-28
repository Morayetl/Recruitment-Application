import { Request, Response } from "express";
import { Users, Applications, Jobs } from "config/mongo";
import { USER_ROLES } from "./Constants";
import moment = require("moment");
import { pinoLogger } from "./pino-logger";
const { uuid } = require('uuidv4');
const logger = pinoLogger;

/**
 * Limits file name
 * @param name file name
 * @param maxLength max length of the file with extension
 */
export function limitFileName(name:string, maxLength:number){
    let fileName = name;
    if(!fileName || maxLength) return fileName;

    // get both parts
    const fileNameExtension = "." + fileName.split(".").pop();
    const fileNameBase = fileName.substring(0, fileName.length  -fileNameExtension.length);

    const limit = (maxLength - fileNameExtension.length);
    if(fileNameBase.length > limit){
        // now limit it and set it as fileName
        fileName = fileNameBase.substring(0, limit) + fileNameExtension;
    }

    return fileName;
}


/**
 * 
 * @param usedId user id 
 * @param usedId user id of employee to check if employer has access to users file
 * @param fileName name of the file
 * @param callback if user is allowed callback returns true
 */
export async function protectedFileAccess(userId:string, targetUserId:string, fileName:string, callback:(allowed: boolean)=> void){

    try{
        const user = await Users.findOne({_id: userId}).exec();

        if(!user){
            return callback(false);
        }

        // employee has acces to their own files
        if(user.role === USER_ROLES.employee){
            // find if user has the file id in their attachment
            const attachment = user.userProfile.attachments.find(o => o.name === fileName);
            if(attachment){
                // if user has the id access is granted
                return callback(true);
            }else{
                return callback(false);
            }
        }

        if(user.role === USER_ROLES.employer){
            
            const employee = await Users.findOne({_id: targetUserId}).exec();

            if(!employee){
                return callback(false);
            }
            
            //check if employer has the file 
            const attachment = employee.userProfile.attachments.find(o => o.name === fileName);

            // check if employees has applied to one of employers job, if yes then employer can access users attachments
            const application = await Applications.findOne({creator: userId, applier: targetUserId}).exec();

            
            const job = await Jobs.findOne({_id: application.jobId}).exec();

            // check if job application process time has expired
            if(job && job.applicationProcessExpiringDate && !moment(job.applicationProcessExpiringDate).isSameOrAfter(moment())){
                return callback(false);
            }

            if(application && attachment){
                return callback(true);
            }
        }

        return callback(false);

    }catch(e){
        logger.error([e, 'PROTECT_FILE_ACCESS']);
    }

}


/**
 * return uuid geneated file name with original extension
 * @param originalName original name of the file
 */
export function generateRandomFileName(originalName:string){
    const extension = '.' + originalName.split('.').pop();

    return uuid(originalName) + extension;
}


