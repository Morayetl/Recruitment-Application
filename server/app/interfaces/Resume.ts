import { Document, Schema, Query } from "mongoose";
import { User } from "./User";
import { MAX_LENGTH } from "../utils/Constants";

export interface Education{
  schoolName:         string;
  degreeName:         string;
  startDate:          Date;
  endDate:            Date;
  qualificationLevel: number;
  description:        string;
}

export interface WorkExperience{
  title:              string;
  companyName:        string;
  startDate:          Date;
  endDate:            Date;
  description:        string;
}

export interface ProfessionalSkills{
  title:              string;
  rating:             number;
  duration:           number; // in months
}


export interface Resume{
  education: Array<Education>;
  workExperience: Array<WorkExperience>;
  professionalSkills: Array<ProfessionalSkills>;
}


const ProfessionalSkillsSchema: Schema<ProfessionalSkills & Document> = new Schema({
  title: {
    type: String,
    maxlength: 60,
    required: true
  },
  rating: {
    type:       Number,
    required:   true
  },
  duration: {
    type:       Number,
    //required:   true
  }
});

const WorkExperienceSchema: Schema<WorkExperience & Document> = new Schema({
  title: {
    type: String,
    maxlength: MAX_LENGTH.resume.title,
    required: true
  },
  companyName: {
    type:       String,
    maxlength:  MAX_LENGTH.companyName
  },
  startDate: {
    type:       Date,
    required:   true
  },
  endDate: {
    type:       Date
  },
  description: {
    type: String,
    maxlength: MAX_LENGTH.resume.description
  }
});

const EducationSchema: Schema<Education & Document> = new Schema({
  schoolName: {
    type: String,
    maxlength: MAX_LENGTH.resume.name,
    required: true
  },
  degreeName: {
    type:       String,
    maxlength:  MAX_LENGTH.resume.name
  },
  startDate: {
    type:       Date,
    required:   true
  },
  endDate: {
    type:       Date
  },
  qualificationLevel: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    maxlength: MAX_LENGTH.resume.description
  }
});

const ResumeSchema: Schema<Resume & Document> = new Schema({
  education: { 
    type: [EducationSchema],
    default: []
  },
  workExperience: { 
    type: [WorkExperienceSchema],
    default: []
  },
  professionalSkills: {
    type: [ProfessionalSkillsSchema],
    default: []
  }
});

/*
ResumeSchema.path('education').validate( async function (this: Query<any>){
  let promise = new Promise((resolve, reject)=> {
    this.findOne(this.getQuery(), (err:any, user:User) =>{
      if(user.resume && user.resume.education){
        resolve(user.resume.education.length)
      }else{
        resolve(0);
      }
    });
  });

  const length = await promise;
  console.log(length);
  if(length < 20){
    return true;
  }
  return false;
}, 'MAX_VALUE_EXCEEDED');

ResumeSchema.path('workExperience').validate( async function (this: Query<any>){

  let promise = new Promise((resolve, reject)=> {
    this.findOne(this.getQuery(), (err:any, user:User) =>{
      if(user.resume && user.resume.workExperience){
        resolve(user.resume.workExperience.length)
      }else{
        resolve(0);
      }
    });
  });

  const length = await promise;
  if(length < 20){
    return true;
  }
  return false;
}, 'MAX_VALUE_EXCEEDED');

ResumeSchema.path('professionalSkills').validate( async function (this: Query<any>){

  let promise = new Promise((resolve, reject)=> {
    this.findOne(this.getQuery(), (err:any, user:User) =>{
      if(user.resume && user.resume.professionalSkills){
        resolve(user.resume.professionalSkills.length)
      }else{
        resolve(0);
      }
    });
  });

  const length = await promise;
  if(length < 20){
    return true;
  }
  return false;
}, 'MAX_VALUE_EXCEEDED');
*/
export default ResumeSchema;