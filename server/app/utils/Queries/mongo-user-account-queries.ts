import {MONGOOSE_MODEL_NAMES, USER_ROLES, SFTP_BASE_PATH} from '../Constants';
import { Transactions, Applications, Jobs, JobAlerts } from 'config/mongo';
import { User, Attachment } from 'interfaces/User';
import sftp from 'config/sftp';
const fs = require('fs');
const path = require('path');
const Transaction = require("mongoose-transactions");

/**
 * For deleting user
 * @param userId 
 * @param role 
 */
export const deleteUser = async (userId:string, role: string) => {
    const mongoosetransaction = new Transaction();
    const transactionIds = await Transactions.find({userId: userId}, {_id: 1}).exec();
    const jobIds = await Jobs.find({creator: userId}, {_id: 1}).exec();
    const jobAlerts = await JobAlerts.find({userId: userId}, {_id: 1}).exec();
    

    // remove user
    mongoosetransaction.remove(MONGOOSE_MODEL_NAMES.User, userId);

    // remove job alerts
    jobAlerts.map((value)=>{
        mongoosetransaction.remove(MONGOOSE_MODEL_NAMES.JobAlertModel, value._id); 
     });

    if(role === USER_ROLES.employer){

        // remove transactions
        transactionIds.map((value)=>{
            mongoosetransaction.remove(MONGOOSE_MODEL_NAMES.Transactions, value._id); 
        });

        // remove jobs that employer has posted
        jobIds.map((value)=>{
            mongoosetransaction.remove(MONGOOSE_MODEL_NAMES.Job, value._id); 
        });
        
        // remove applications that employer has received
        const applicationsIds = await Applications.find({jobId: {$in: jobIds.map(value => value._id)}}, {_id: 1}).exec();
        applicationsIds.map((value)=>{
           mongoosetransaction.remove(MONGOOSE_MODEL_NAMES.Applications, value._id); 
        });
    }

    if(role === USER_ROLES.employee){
        // remove employees applied applications
        const applicationsIds = await Applications.find({applier: userId}, {_id: 1}).exec();
        applicationsIds.map((value)=>{
           mongoosetransaction.remove(MONGOOSE_MODEL_NAMES.Applications, value._id); 
        });
    }

    return mongoosetransaction;
}

/**
 * 
 * @param jobId the id of the job
 * @param creatorId used for users to delete their own posts
 * @param transaction 
 */
export const deleteJob = async (jobId:string, creatorId:string| null, transaction: any) => {
    let userId = {};
    if(creatorId){
        userId  = { creator: creatorId};
    }
    const job = await Jobs.findOne({_id: jobId, ...userId}, {_id: 1}).exec();
    const applicationsIds = job? await Applications.find({jobId: job._id}, {_id: 1}).exec() : [];

    // remove jobs that employer has posted
    if(job && applicationsIds){
        transaction.remove(MONGOOSE_MODEL_NAMES.Job, job._id); 
        
        // remove applications that employer has received
        applicationsIds.map((value)=>{
            transaction.remove(MONGOOSE_MODEL_NAMES.Applications, value._id); 
        });        
    }

    return transaction;
}

/**
 * Deletes images
 * @param usr 
 */
export const deleteUserImages = async (usr:User) => {
    try{
        const user = usr.toJSON();

        if(user && user.role === USER_ROLES.employer && user.companyProfile &&user.companyProfile.image){
            const path = SFTP_BASE_PATH + '/public/' + user.companyProfile.image;

            // remove employees profile picture 
            if(await sftp.exists(path)){
                await sftp.delete(path);
            }
        }

        if(user && user.role === USER_ROLES.employee){
            const path = SFTP_BASE_PATH + '/private/'
            await Promise.all(user.userProfile.attachments.map(async (attachment: Attachment) => {
                // if attachment exist remove it
                if(await sftp.exists(path + attachment.name)){
                    await sftp.delete(path + attachment.name);
                }
            }));
        }
    }catch(e){
        throw e;
    }
}
