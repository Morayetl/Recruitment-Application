/**
 * This Mongoose model saves jobs that will be advertised in front page
 */
import mongoose, { Schema, Document } from 'mongoose';
import { MONGOOSE_MODEL_NAMES } from 'utils/Constants';

export interface JobAdvertisement extends Document{
  jobId:        string;   // activation code
  endDate:      Date;   // posted job id
  created:      Date;
}

export const JobAdvertisementSchema: Schema<JobAdvertisement> = new Schema({
  jobId:{
    type: Schema.Types.ObjectId,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
}, { timestamps: { createdAt: 'created'}});

export const JobAdvertisementModel =  mongoose.model<JobAdvertisement>(MONGOOSE_MODEL_NAMES.JobAdvertisement, JobAdvertisementSchema);