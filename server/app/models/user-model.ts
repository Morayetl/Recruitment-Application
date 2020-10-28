import { Users, Jobs, ActivationCodes, PurchasedItems } from "../config/mongo";
import { User, Attachment } from "../interfaces/User";
import { Response, Request } from "express";
import JsonWebToken from "../utils/JsonWebToken";
import { SESSION_TOKEN_CLIENT_EXPIRATION_TIME, USER_ROLES, RESET_PASSWORD_USER_MAIL_SUBJECT, RESEND_EMAIL_ACTIVATION_USER_MAIL_SUBJECT, PASSWORD_SALT_ROUNDS, COMPANY_URL, MAX_FILE_SIZE_LIMITS, MAX_LENGTH, COMPANY_URL_BACKEND, SFTP_BASE_PATH } from "../utils/Constants";
import { getPackagePrices } from "utils/Queries/mongo-package-queries";
import { limitFileName, generateRandomFileName } from 'utils/File';
import sftp from '../config/sftp';
import { deleteUser, deleteUserImages } from "utils/Queries/mongo-user-account-queries";
import moment = require("moment");
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

/**
 * Gets employers company informations
 * @param req 
 * @param res 
 */
export async function getCompanyInformation(req: Request, res: Response) {
    try{
        // @ts-ignore
        const user = await Users.findOne({_id: req.params.id, role: USER_ROLES.employer},{'companyProfile':1}).exec()
        if(user && user.companyProfile){
            const usr = user.toJSON();
            const companyProfile = user.companyProfile;
            const data = {
                address: companyProfile.address,
                companyId: companyProfile.companyId,
                companySize: companyProfile.companySize,
                description: companyProfile.description,
                establishingYear: companyProfile.establishingYear,
                firstname: companyProfile.firstname,
                lastname: companyProfile.lastname,
                location: companyProfile.location,
                name:   companyProfile.name,
                urls: companyProfile.urls,
                image: usr.companyProfile.image ? COMPANY_URL_BACKEND + '/api/public/' + usr.companyProfile.image : null
            }

            res.send(data);          
            return;
        } else{
            res.status(404).send([]);
        }  
    }catch(e){
        req['log'].error([e, 'USER_MODEL_GET_COMPANY_INFORMATION']);
        return res.sendStatus(500);
    }

}

/**
 * Gets authenticated employer/employee informations
 * @param req 
 * @param res 
 */
export async function getUser(req: Request, res: Response) {

    try{
        const user = await Users.findOne({_id: res.locals.decodedCredentials.data.id}, {userProfile:1 , companyProfile: 1, email: 1, role: 1}).exec();
        if(user && user.role === USER_ROLES.employer){
            let data = {
                userVerified: user.userVerified,
                emailVerified: user.emailVerified,
                email: user.email,
                image: user.companyProfile.image ? COMPANY_URL_BACKEND + '/api/public/' + user.companyProfile.image : '',
                name: user.companyProfile.name,
                firstname: user.companyProfile.firstname,
                lastname: user.companyProfile.lastname,
                number: user.companyProfile.number,
                address: user.companyProfile.address,
                companySize: user.companyProfile.companySize,
                location: user.companyProfile.location,
                homePageUrl: user.companyProfile.urls.homePageUrl,
                facebookPageUrl: user.companyProfile.urls.facebookPageUrl,
                twitterPageUrl: user.companyProfile.urls.twitterPageUrl,
                githubPageUrl: user.companyProfile.urls.githubPageUrl,
                googlePageUrl: user.companyProfile.urls.googlePageUrl,
                linkedinPageUrl: user.companyProfile.urls.linkedinPageUrl,
                establishingYear: user.companyProfile.establishingYear,
                description: user.companyProfile.description,
                companyId: user.companyProfile.companyId,
                tags:   user.companyProfile.tags,
                birthday: user.companyProfile.birthday
            }     

            return res.send(data);          
        }

        if(user && user.role === USER_ROLES.employee){
            const data =  user.toJSON();
            delete data.userProfile.attachments; // attachments isnt needed in job seekers profile view, so we delete it
            res.send(data);          
        }        
        else {
            res.sendStatus(404);  
        }      
    }catch(e){
        req['log'].error([e, 'USER_MODEL_GET_USER']);
        res.sendStatus(500);
    }

}

/**
 * Updates user information
 * @param req 
 * @param res 
 */
export async function updateUser(req: Request, res: Response) {

    let data:User = req.body;
    delete data.email;

    if(res.locals.decodedCredentials.data.role === USER_ROLES.employer){
        delete data.companyProfile.image;
        delete data.userProfile;
    }
    
    if(res.locals.decodedCredentials.data.role === USER_ROLES.employee){
        delete data.companyProfile;
    }

    try{
        const user = await Users.findOne({email: res.locals.decodedCredentials.data.email});

        if(user){
            if(res.locals.decodedCredentials.data.role === USER_ROLES.employer){
                Object.assign(user.companyProfile, data.companyProfile);
            }

            if(res.locals.decodedCredentials.data.role === USER_ROLES.employee){
                Object.assign(user.userProfile, data.userProfile);
            }
            await user.save();
            res.sendStatus(200);        
        }else {
            res.sendStatus(404);
        }  

    }catch(e){
        req['log'].error([e, 'USER_MODEL_UPDATE_USER']);
        res.sendStatus(500);
    };
}

/**
 * Updates employer profile picture
 * @param req 
 * @param res 
 */
export async function updateEmployerProfilePicture(req: Request, res: Response) {

    const imageName = generateRandomFileName(req.file.originalname);

    try{
        const user = await Users.findOne({_id: res.locals.decodedCredentials.data.id}).exec();

        if(user){
            const p = path.resolve('resources/public') + '/' + imageName;
            if(await sftp.exists(p)){
                // remove old image
                await sftp.delete(p);
            }

            // send new image to ftp
            await sftp.put(req.file.buffer, SFTP_BASE_PATH + '/public/' + imageName);
            user.companyProfile.image = imageName;
            await user.save();
            res.sendStatus(200);  
        }else {
            return res.sendStatus(401);
        }  

    }catch(e){
        req['log'].error([e, 'USER_MODEL_UPDATE_EMPLOYER_PROFILE_PICTURE']);
        res.sendStatus(500);
    }
}

/**
 * Adds attachment for employee
 * @param req 
 * @param res 
 */
export async function addEmployeeAttachment(req: Request, res: Response) {

    const originalName = limitFileName(req.file.originalname,MAX_FILE_SIZE_LIMITS.fileNameLength);
    const fileName = generateRandomFileName(req.file.originalname);

    try{
        const user = await Users.findOne({_id: res.locals.decodedCredentials.data.id}).exec();

        if(user){

            //check if amount of documents has reach limit, if yes then return
            if(user.userProfile.attachments.length >= MAX_LENGTH.employee.attachments){
                return res.sendStatus(422);
            }

            // send file to ftp server 
            await sftp.put(req.file.buffer, SFTP_BASE_PATH + '/private/'+fileName);
            const mimeType = req.file.mimetype.toString();

            // add attachment to mongo
            const attachment: Attachment = {
                originalName: originalName,
                name: fileName,
                mimeType: mimeType
            }

            user.userProfile.attachments.push(attachment);
            await user.save();
            res.sendStatus(200);   
        }else {
            res.send([]);  
        }  

    }catch(e){
        req['log'].error([e, 'USER_MODEL_ADD_EMPLOYEE_ATTACHMENT']);
        res.sendStatus(500);
    }
}

/**
 * gets employees attachments
 * @param req 
 * @param res 
 */
export async function getEmployeeAttachments(req: Request, res: Response) {
    try{
        const user = await Users.findOne({_id: res.locals.decodedCredentials.data.id}).exec();

        if(user && user.userProfile){
            const data = user.userProfile.attachments.map((value, index) =>{
                return {
                    id:     value._id,
                    uid:    index,
                    name:   value.originalName,
                    url:    COMPANY_URL_BACKEND + '/api/protected/' + value.name,
                    type:   value.mimeType
                }
            });
            res.send(data);   
        }else {
            res.send([]);  
        }  

    }catch(e){
        req['log'].error([e, 'USER_MODEL_GET_EMPLOYEE_ATTACHMENTS']);
        res.sendStatus(500);
    }

}

/**
 * deletes employees attachments
 * @param req 
 * @param res 
 */
export async function deleteEmployeeAttachment(req: Request, res: Response) {
    try{
        const id = req.params.id;
        const user = await Users.findOne({_id: res.locals.decodedCredentials.data.id}).exec();

        if(user && user.userProfile && id){
            const index = user.userProfile.attachments.findIndex( (attachment:Attachment) => {
                if(!attachment._id){
                    return false;
                }
                return attachment._id.toString() === id;
            });

            if(index > -1){
                const filename = user.userProfile.attachments[index].name;
                const p = SFTP_BASE_PATH + '/private' + '/' + filename;

                // checks if file exists in ftp server
                if(await sftp.exists(p)){
                    await sftp.delete(p);
                }
                
                user.userProfile.attachments.splice(index, 1);
                await user.save(); 
                return res.sendStatus(200);
            }else{
                return res.sendStatus(404);   
            }
        }else {
            res.sendStatus(404);
        }  

    }catch(e){
        req['log'].error([e, 'USER_MODEL_DELETE_EMPLOYEE_ATTACHMENT']);
        res.sendStatus(500);
    }
}

/**
 * Deletes employer profile picture
 * @param req 
 * @param res 
 */
export async function deleteEmployerProfilePicture(req: Request, res: Response) {

    try{
        const user = await Users.findOne({email: res.locals.decodedCredentials.data.email}).exec();

        if(user){
            if(user.companyProfile.image){
                const u = user.companyProfile.image.split('/');
                const imageName = u[u.length-1];
                const p = SFTP_BASE_PATH + '/public' + '/' + imageName;
                
                if(await sftp.exists(p)){
                    await sftp.delete(p);
                }

                user.companyProfile.image = '';
                await user.save();
                res.sendStatus(200);  
            }else{
                res.status(200).send({ status: 200});  
            }

        }else {
            res.send([]);  
        }  

    }catch(e){
        req['log'].error([e, 'USER_MODEL_DELETE_EMPLOYER_PROFILE_PICTURE']);
        res.sendStatus(500);
    }

}

export async function loginUser(req: Request & {rateLimit: object}, res: Response) {
    const credentials = req.body;

    try{
        // we are using regex to ignore the Case sensitivity
        const user =  await Users.findOne({role:{ $in:[USER_ROLES.employee,USER_ROLES.employer]},email: { $regex: new RegExp("^" + credentials.email.toLowerCase(), "i")}}).exec();
        
        if(!user){
            res.status(403).send(403);
            return;
        }

        const match = await bcrypt.compare(credentials.password, user.password);
        if(match){
            const token = JsonWebToken.sign(user.email, user.role, user._id);

            res.set('Authorization', 'Bearer ' + token);

            if(user.emailVerified || process.env.NODE_ENV === 'development'){
                // login timestamp
                user.lastLogin = new Date();

                // if user doesnt login before expire date, account will be deleted
                user.expireDate = moment().add(1, 'year').toDate();
                await user.save();
                res.status(200).send({ status: 200, token: token, role: user.role, exp: SESSION_TOKEN_CLIENT_EXPIRATION_TIME, emailVerified: user.emailVerified || process.env.NODE_ENV === 'development' });
            }else{
                res.status(200).send({ emailVerified: user.emailVerified });
            }
        }else {
            res.status(403).send(403);
            return;
        }
    }catch(e){
        req['log'].error([e, 'USER_MODEL_LOGIN_USER']);
        res.sendStatus(500);
    }
}

export async function register(req: Request, res: Response) {

    const data: any = req.body;
  
    try{
        const salt: string = await bcrypt.genSalt(PASSWORD_SALT_ROUNDS);
        const hash = await bcrypt.hash(data.password, salt);


        const user = new Users({
            role: USER_ROLES.employer,
            email: data.email, 
            password: hash,
            companyProfile: {
                birthday:         data.birthday,
                image:            '',
                name:             data.name, // name of the company
                firstname:        data.firstname,
                lastname:         data.lastname,
                number:           data.number,
                address:          data.address,
                companySize:      data.companySize,
                location:         data.location,
                companyId:        data.companyId,
                urls:             {
                    homePageUrl:      data.homePageUrl,
                    facebookPageUrl:  data.facebookPageUrl,
                    linkedinPageUrl:  data.linkedinPageUrl,
                    twitterPageUrl:   data.twitterPageUrl,
                    googlePageUrl:    data.googlePageUrl,
                    githubPageUrl:    data.githubPageUrl                        
                },
                establishingYear: data.establishingYear                 
            }
        });

    
        const usr = await user.save();     
        const products = await getPackagePrices(true);

        // if there are free products add it to users packages
        if(usr && products && products.free.amountOfPost > 0){
            const experiDate = moment().add(products.free.expireTime,'months').toDate();
    
            const userPackage = new PurchasedItems({
                userId:         usr._id,
                name:           products.free.name,
                amount:         products.free.amountOfPost,
                remaining:      products.free.amountOfPost,
                endDate:        experiDate,
                packagePriceId: products._id,
                transactionId:  '',
                transactions:   {}
            });            

            await userPackage.save();
        }

        if(usr){
            res.sendStatus(200);  
        }else{
            throw new Error('user not found');
        }

    }catch(e){
        req['log'].error([e, 'USER_MODEL_REGISTER']);
        res.sendStatus(500);
    }
}

export async function verifyEmail(req: Request, res: Response) {
    const query = req.query;

    try{
        const activationCode = await ActivationCodes.findOne({...query, type: 'activate-user' });

        if(activationCode){
            await Users.findOneAndUpdate({email: query.email}, { 'emailVerified': true, 'expireDate': moment().add(2,"year").toDate()})
            await activationCode.remove();
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }catch(e){
        req['log'].error([e, 'USER_MODEL_VERIFY_EMAIL']);
        res.sendStatus(500);
    }
}

export async function resendEmailVerification(req: Request, res: Response) {
    try{

        res.sendStatus(200);  
    }catch(e){
        req['log'].error([e, 'USER_MODEL_RESEND_EMAIL_VERIFICATION']);
        res.sendStatus(500);
    }
}

/**
 * Sends to user token which will be used for reseting password
 * @param req 
 * @param res 
 */
export async function sendPasswordResetToken(req: Request, res: Response) {
    const query = req.query;

    try{
        res.sendStatus(200);  
    }catch(e){
        req['log'].error([e, 'USER_MODEL_SEND_PASSWORD_RESET_TOKEN']);
        res.sendStatus(500);
    }
}



export async function registerJobSeeker(req: Request, res: Response) {
    const data: any = req.body;
    
    try{
        const salt: string = await bcrypt.genSalt(PASSWORD_SALT_ROUNDS);
        const hash = await bcrypt.hash(data.password, salt);

        const user = new Users({
            ...data,
            role: USER_ROLES.employee,
            created: new Date(),
            modified: new Date(),
            password: hash
        });
    
        await user.save();     

        res.sendStatus(200);  

    }catch(e){
        req['log'].error([e, 'USER_MODEL_REGISTER_JOB_SEEKER']);
        res.sendStatus(500);
    }
}

/**
 * Change password
 * @param req 
 * @param res 
 */
export async function ChangePassword(req: Request, res: Response) {
    const credentials = req.body;
    const salt = bcrypt.genSaltSync(PASSWORD_SALT_ROUNDS);
    const newPassword = bcrypt.hashSync(credentials.password, salt);

    try{
        const user = await Users.findOne({email: res.locals.decodedCredentials.data.email}, 'password').exec();
        if(user){
            const passwordMatches = bcrypt.compareSync(credentials.currentPassword, user.password); 

            if(passwordMatches) {
                const data = {
                    password: newPassword
                }
                Users.updateOne({email: res.locals.decodedCredentials.data.email}, data, {new: true}, function(err:any, user:any) { 
                    if(err){
                        console.log(err);
                    }  
                    if(user){
                        res.status(200).send({code: 200});       
                    }
                });                
            } else {
                return res.sendStatus(403);  
            }
        }else{
            return res.sendStatus(403); 
        }
    }catch(e){
        req['log'].error([e, 'USER_MODEL_CHANGE_PASSWORD']);
        res.sendStatus(500);
    }
}

/**
 * Reset password
 * @param req 
 * @param res 
 */
export async function ResetPassword(req: Request, res: Response) {
    try{
        res.sendStatus(200);
    }catch(e){
        req['log'].error([e, 'USER_MODEL_RESET_PASSWORD']);
        res.sendStatus(500);
    }
}

/**
 * Get total amount of  users & companys info for frontpage
 * @param req 
 * @param res 
 */
export async function GetUserAndCompanyAmount(req: Request, res: Response) {

    try{
        const aggregation = await Users.aggregate([
            {
                $match: {
                    role:{
                        $in:[
                            USER_ROLES.employee,
                            USER_ROLES.employer
                        ]
                    },
                    emailVerified: true
                }
            },
            {
                $group: {
                    _id: {
                        role: '$role'
                    },
                    count: { $sum: 1 }
                },

            },
            {
                $project: {
                    role:   '$_id.role',
                    count:  1,
                    _id:    0
                }            
            }
        ]).exec();

        if(aggregation){
            res.send(aggregation)
        } else {
            res.sendStatus(200);  
        }
    }catch(e){
        req['log'].error([e, 'USER_MODEL_GET_USER_AND_COMPANY_AMOUNT']);
        res.sendStatus(500);
    }

}

/**
 * Get total amount of  jobs that are available
 * @param req 
 * @param res 
 */
export async function GetJobAmount(req: Request, res: Response) {

    try{
        const aggregation = await Jobs.aggregate([
            {
                $match:{
                    startDate :{
                        $lte: new Date()
                    },
                    endDate :{
                        $gte: new Date()
                    },                
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0
                }
            }
        ]).exec();

        if(aggregation){
            res.send(aggregation[0])
        } else {
            res.status(200).send({count:0});  
        }
    }catch(e){
        req['log'].error([e, 'USER_MODEL_GET_JOB_AMOUNT']);
        res.sendStatus(500);
    }

 
}

/**
 * Check if user exists
 * @param req 
 * @param res 
 */
export async function UserExists(req: Request, res: Response) {
    
    try{
        const count = await Users.countDocuments({email: { $regex: new RegExp("^" + req.params.email.toLowerCase(), "i")}}).exec();

        if(count){
            res.send({exists:true})
        } else {
            res.send({exists:false});  
        }
    }catch(e){
        req['log'].error([e,'USER_MODEL_USER_EXISTS']);
        res.sendStatus(500);
    }  
}


/**
 * removes user and its images
 * @param req 
 * @param res 
 */
export async function removeUser(req: Request, res: Response) {
    let transaction = null;
    try{
        const user = await Users.findOne({_id: res.locals.decodedCredentials.data.id}).exec();

        if(!user){
            return res.sendStatus(404);
        }

        transaction = await deleteUser(user._id,user.role);
        
        await deleteUserImages(user);
        await transaction.run();


        res.sendStatus(200);
    }catch(e){
        req['log'].error([e,'USER_MODEL_REMOVE_USER']);
        await transaction.rollback();
        return res.sendStatus(500);
    }
}
