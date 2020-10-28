import { getCodeSetByValue, getLocationNameByCode } from "../Mysql-queries";
import { CODESETS, MAX_LENGTH } from "../Constants";
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { PurchasedItems, Users } from "config/mongo";
import moment = require("moment");

const striptags = require('striptags');

export const jobStartDateValidator = (startDate: Date) => {

    if(!startDate) return;
    const max = moment().add(MAX_LENGTH.job.startDate,'months').toDate().getTime();
    const start = startDate.getTime();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() -1);

    if (start < currentDate.getTime() ||  start > max ) {
        throw new Error(`start date can't be more than ${MAX_LENGTH.job.startDate} months from today`);
    }
    return true;
};

/*export const jobafterStartDateValidator = (endDate: Date, {req}) => {

    if(!endDate) return;

    if (endDate.getTime() < req.body.startDate.getTime()) {
        throw new Error(`Start date is cant be after end data`);
    }
    return true;
};*/


export const qualificationValidator = async (qualification: number) => {
    if(!qualification) return;
    const value = await getCodeSetByValue(CODESETS.qualificationLevel, qualification);

    if(!value){
        throw new Error('qualification doesnt exist!');
    }
    return true;
};

export const careerLevelValidator = async (careerLevel: number) => {
    if(!careerLevel) return;
    const value = await getCodeSetByValue(CODESETS.careerLevel, careerLevel);

    if(!value){
        throw new Error('career level doesnt exist!');
    }
    return true;
};

/**
 * Throws error if user exits
 * @param email email of the user
 */
export const userExistsValidator = async (email: string) => {
    if(!email) return;

    const count = await Users.countDocuments({email: { $regex: new RegExp("^" + email.toLowerCase(), "i")}}).exec();

    if(count){
        throw new Error('user already exists!');
    }
    return true;
};

export const jobTypeValidator = async (jobType: number) => {
    if(!jobType) return;
    const value = await getCodeSetByValue(CODESETS.jobType, jobType);

    if(!value){
        throw new Error('job type doesnt exist!');
    }
    return true;
};

export const companySizeValidator = async (companySize: number) => {
    if(!companySize) return;
    const value = await getCodeSetByValue(CODESETS.companySize, companySize);

    if(!value){
        throw new Error('company size doesnt exist!');
    }
    return true;
};

export const locationValidator = async (location: string) => {
    if(!location) return;
    const value = await getLocationNameByCode(location);

    if(!value){
        throw new Error('location doesnt exist!');
    }
    return true;
};

export const urlValidator = (url: string) => {
    if(!url) return true;

    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    if(!url.match(pattern)){
        throw new Error('url is invalid!');
    }
    return true;
};

export const phoneNumberValidator = (number: string) => {
    if(!number) return true;

      // checks that number starts with + and continues with number
    const regex = /^\+\d*$/;
    const phoneNumber = parsePhoneNumberFromString(number)
    if(phoneNumber && phoneNumber.isValid() && number.match(regex)){
        return true;
    }else{
        throw new Error('Phone number is not correct!');
    }
};

export const descriptionSanitizer = (value: string) => {
    return striptags(value, ['h1','h2','h3','h4','h5','h6','s','p','strong','li','ul','ol','a']);
}


export const paymentPackageValidator = async (packageId: string) => {
    if(!packageId) return;
    const value = await PurchasedItems.findById(packageId).exec();

    if(!value){
        throw new Error('package doesnt exist!');
    }

    if(new Date(value.endDate).getTime() < Date.now()){
        throw new Error('package has expired');
    }

    if(value.remaining < 1){
        throw new Error('there arent remaining job post');
    }
    return true;
};

export const emailFrequencyValidator = async (emailFrequency: number) => {
    if(!emailFrequency) return;
    const value = await getCodeSetByValue(CODESETS.emailFrequency, emailFrequency);

    if(!value){
        throw new Error('Email frequency doesnt exist!');
    }
    return true;
};

/**
 * Checks if start date is before enn
 * @param endDate 
 * @param param1 
 */
export const startDateIsBeforeEndDate = async (endDate: Date ,{req}) => {

    if(!req.body.startDate || !endDate){
        return true;
    }
    const startDateMoment = moment(req.body.startDate);
    const endDateMoment = moment(endDate);

    // if start date is same or after end date, throw error
    if (startDateMoment.set({hour:0,minute:0,second:0,millisecond:0}).isSameOrAfter(endDateMoment)) {
        throw new Error('start date cant be after end date');
    } 
    
    return true;
};


