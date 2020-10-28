import mongoose, { Schema, Document } from 'mongoose';
import { MONGOOSE_MODEL_NAMES } from '../utils/Constants';


export interface JobAlert{
  userId:             string;
  jobId:              string;   // used for employer to get job application notification
  emailFrequency:     number;   // email frequency, how often emails will be sent
  location:           string;
  searchWord:         string;
  created:            Date;
  nextAlarm:          Date;
}

export type JobAlertDocument =  JobAlert & Document;

const JobAlertSchema: Schema<JobAlertDocument> = new Schema({
  userId: {
    type:         String,
    required:     true
  },
  jobId: { 
    type:         String
  },
  emailFrequency: { 
    type:         Number,
    required:     true
  },
  location: {
    type:         String,
    required:     true
  },
  searchWord: {
    type:         String,
    maxlength:    30,
    required:     true
  },
  nextAlarm: {
    type:         Date,
    default:      new Date(),
    required:     true
  }
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' }});

export const JobAlertModel =  mongoose.model<JobAlertDocument>(MONGOOSE_MODEL_NAMES.JobAlertModel, JobAlertSchema);