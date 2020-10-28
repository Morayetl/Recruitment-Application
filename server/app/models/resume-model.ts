import { Users } from "../config/mongo";
import { User } from "../interfaces/User";
import { Response, Request } from "express";
import { getCodeSetByValue } from "../utils/Mysql-queries";

/**
 * Gets employee resume informations
 * @param req 
 * @param res 
 */
export async function getResume(req: Request, res: Response) {


    try{
        const user = await Users.findOne({email: res.locals.decodedCredentials.data.email},'resume').exec();
        if(user){
            const data: User = user.toObject();
            let education = await Promise.all(data.resume.education.map(async(value:any) =>{
                const qualificationLevelCodeset = await getCodeSetByValue('qualificationLevel', value.qualificationLevel);
                return {...value, qualificationLevelCodeset};
            }));
            data.resume.education = education;
            return res.status(200).send(data);
        }

        res.status(404).send({});
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL_GET_RESUME']);
        res.sendStatus(500);
    }
}

/**
 * Updates resume
 * @param req 
 * @param res 
 */
export async function updateResume(req: Request, res: Response) {

    try{
        const user = await Users.findOneAndUpdate({email: res.locals.decodedCredentials.data.email}, {resume:req.body.resume}).exec();

        if(user && user.resume){
            res.status(200).send(user.resume.education);          
        }else {
            res.send([]);  
        }     
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL_UPDATE_RESUME']);
        res.sendStatus(500);
    }
}

/**
 * Deletes education
 * @param req 
 * @param res 
 */
export async function DeleteEducation(req: Request, res: Response) {
    const id = req.params.id;

    const data = {
        '$pull': {
            'resume.education':{ '_id': id }
        }
    }

    try{
        const user = await Users.findOneAndUpdate({email: res.locals.decodedCredentials.data.email}, data,{new: true}).exec();
        if(user.resume){
            const data: User = user.toObject();
            let education = await Promise.all(data.resume.education.map(async(value:any) =>{
                const qualificationLevelCodeset = await getCodeSetByValue('qualificationLevel', value.qualificationLevel);
                return {...value, qualificationLevelCodeset};
            }));
            res.status(200).send(education);         
        }else {
            res.send([]);  
        }  
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL_DELETE_EDUCATION']);
        res.sendStatus(500);
    }
}

/**
 * Updates education
 * @param req 
 * @param res 
 */
export async function UpdateEducation(req: Request, res: Response) {
    const id = req.params.id;

    const data = {
        '$set': {
            'resume.education.$': req.body
        }
    }

    try{
        const user = await Users.findOneAndUpdate({email: res.locals.decodedCredentials.data.email, 'resume.education._id': id}, data,{new: true}).exec();

        if(user && user.resume){
            const data: User = user.toObject();
            let education = await Promise.all(data.resume.education.map(async(value:any) =>{
                const qualificationLevelCodeset = await getCodeSetByValue('qualificationLevel', value.qualificationLevel);
                return {...value, qualificationLevelCodeset};
            }));
            res.status(200).send(education);          
        }else {
            res.send([]);  
        }   
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL']);
        res.sendStatus(500);
    }
}

/**
 * Adds education
 * @param req 
 * @param res 
 */
export async function AddEducation(req: Request, res: Response) {
    const data = {
        '$push': {
            'resume.education':req.body
        }
    }

    try{
        const user = await Users.findOneAndUpdate({email: res.locals.decodedCredentials.data.email}, data, {new: true, runValidators: true, context: 'query'}).exec();
        if(user && user.resume){
            const data: User = user.toObject();
            let education = await Promise.all(data.resume.education.map(async(value:any) =>{
                const qualificationLevelCodeset = await getCodeSetByValue('qualificationLevel', value.qualificationLevel);
                return {...value, qualificationLevelCodeset};
            }));
            res.status(200).send(education);       
        }else {
            res.send([]);  
        } 
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL_ADD_EDUCATION']);
        res.sendStatus(500);
    }
}

/**
 * Deletes work experience
 * @param req 
 * @param res 
 */
export async function DeleteWorkExperience(req: Request, res: Response) {
    const id = req.params.id;

    const data = {
        '$pull': {
            'resume.workExperience':{ '_id': id }
        }
    }

    try{
        const user = await Users.findOneAndUpdate({email: res.locals.decodedCredentials.data.email}, data,{new: true}).exec();
        if(user){
            const workExperience = user.resume.workExperience ? user.resume.workExperience : [];
            res.status(200).send(workExperience);          
        }else {
            res.send([]);  
        }     
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL_DELETE_WORK_EXPERIENCE']);
        res.sendStatus(500);
    }
}

/**
 * Updates work experience
 * @param req 
 * @param res 
 */
export async function UpdateWorkExperience(req: Request, res: Response) {
    const id = req.params.id;

    const data = {
        '$set': {
            'resume.workExperience.$': req.body
        }
    }

    try{
        const user = await Users.findOneAndUpdate({email: res.locals.decodedCredentials.data.email, 'resume.workExperience._id': id}, data,{new: true}).exec();

        if(user){
            const workExperience = user.resume.workExperience ? user.resume.workExperience : [];
            res.status(200).send(workExperience);          
        }else {
            res.send([]);  
        }      
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL_UPDATE_WORK_EXPERINCE']);
        res.sendStatus(500);
    }
}

/**
 * Adds work experience
 * @param req 
 * @param res 
 */
export async function AddWorkExperience(req: Request, res: Response) {
    const data = {
        '$push': {
            'resume.workExperience':req.body
        }
    }

    try{
        const user = await Users.findOneAndUpdate({email: res.locals.decodedCredentials.data.email}, data, {new: true, runValidators: true, context: 'query'}).exec();
        
        if(user){
            const workExperience = user.resume.workExperience ? user.resume.workExperience : [];
            res.status(200).send(workExperience);          
        }else {
            res.send([]);  
        }     
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL_ADD_WORK_EXPERIENCE']);
        res.sendStatus(500);
    }
}

/**
 * Deletes a professional skill
 * @param req 
 * @param res 
 */
export async function DeleteProfessionalSkill(req: Request, res: Response) {
    const id = req.params.id;

    const data = {
        '$pull': {
            'resume.professionalSkills':{ '_id': id }
        }
    }
    
    try{
        const user = await Users.findOneAndUpdate({email: res.locals.decodedCredentials.data.email}, data,{new: true}).exec();

        if(user){
            const professionalSkills = user.resume.professionalSkills ? user.resume.professionalSkills : [];
            res.status(200).send(professionalSkills);          
        }else {
            res.send([]);  
        }    
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL_DELETE_PROFESSIONAL_SKILL']);
        res.sendStatus(500);
    }
}

/**
 * Updates a professional skill
 * @param req 
 * @param res 
 */
export async function UpdateProfessionalSkill(req: Request, res: Response) {
    const id = req.params.id;

    const data = {
        '$set': {
            'resume.professionalSkills.$': req.body
        }
    }

    try{
        const user = await Users.findOneAndUpdate({email: res.locals.decodedCredentials.data.email, 'resume.professionalSkills._id': id}, data,{new: true}).exec();

        if(user){
            const professionalSkills = user.resume.professionalSkills ? user.resume.professionalSkills : [];
            res.status(200).send(professionalSkills);          
        }else {
            res.send([]);  
        } 
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL_UPDATE_PROFESSIONAL_SKILL']);
        res.sendStatus(500);
    }
}

/**
 * Adds a professional skill
 * @param req 
 * @param res 
 */
export async function AddProfessionalSkill(req: Request, res: Response) {
    const data = {
        '$push': {
            'resume.professionalSkills':req.body
        }
    }

    try{
        const user = await Users.findOneAndUpdate({email: res.locals.decodedCredentials.data.email}, data, {new: true, runValidators: true, context: 'query'}).exec();

        if(user){
            const professionalSkills = user.resume.professionalSkills ? user.resume.professionalSkills : [];
            res.status(200).send(professionalSkills);          
        }else {
            res.send([]);  
        }    
    }catch(e){
        req['log'].error([e, 'RESUME_MODEL_ADD_PROFESSIONAL_SKILL']);
        res.sendStatus(500);
    }
}


