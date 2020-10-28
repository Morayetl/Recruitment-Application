import { MAX_LENGTH, MONGOOSE_MODEL_NAMES } from "../utils/Constants";
import mongoose, { Schema, Document } from 'mongoose';

export interface Application extends Document{
  jobId:              string;
  applier:            string;
  coverLetter:        string;   // email frequency, how often emails will be sent
  startDate:          Date;
  shortlisted:        boolean;  // employer thinks he/she might be the one
  creator:            string;   // job creator(employers id)
  seen:               boolean;  // true, if employer has checked users profile
  created:            Date;
}

const ApplicationsSchema: Schema<Application> = new Schema({
  applier: { 
    type:         String,
    required:     true
  },
  jobId: { 
    type:         String,
    required:     true
  },
  startDate: {
    type: Date
  },
  coverLetter: { 
    type:         String,
    maxlength:    MAX_LENGTH.application.coverletter
  },
  shortlisted: {
    type: Boolean,
    default: false
  },
  creator: { 
    type:         String,
    required:     true
  },
  seen: {
    type: Boolean,
    default: false
  },
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' }});

ApplicationsSchema.index({ applier: 1, jobId: 1 }, { unique: true })

export const ApplicationModel =  mongoose.model<Application>(MONGOOSE_MODEL_NAMES.Applications, ApplicationsSchema);