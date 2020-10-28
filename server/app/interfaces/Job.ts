import mongoose, { Schema, Document } from 'mongoose';
import { check, ValidationChain, body } from 'express-validator';
import { MONGOOSE_MODEL_NAMES } from 'utils/Constants';

export interface Job extends Document{
  /**
   * User that created this
   */
  creator: string | any;

  /**
   * Timestamp when job was created
   */
  created: Date;

  /**
   * Timestamp when job was modified
   */
  modified: Date;

  /**
   * Timestamp when recruiting will start
   */
  startDate: Date;
  
  /**
   * Timestamp when recruiting will end
   */
  endDate: Date;

  /**
   * Salary starting from
   */
  salaryStart: number;

  /**
   * Salary ending to
   */

  salaryEnd: number;
    
  /**
   * url to companys webpage
   */
  url: string;
  /**
   * Job duration (How long the job will take)
   */
  jobDuration: number;

  /**
  * Job duration (How long the job will take)
  */
  jobDurationUnit: number;

  /**
   * Job type if its fulltime? part time?
   */
  jobType: string;

  /**
   * Occupation category
   */
  category: string;

  /**
   * Country code
   */
  location: string;

  /**
   * Job description
   */
  description: Array<{lang: string, title: string, text: string}>;
  /**
   * tags
   */
  tags: Array<string>;
  /**
   * job title
   */
  title: string;
  /**
   * users that applied to the job
   */
  appliers: Array<string>;

  /**
   * Contact persons name
   */
  contactPerson: string;

  /**
   * Contact persons email
   */
  email: string;

  /**
   * Qualification level
   */
  qualification: string;

  /**
   * Career level
   */
  careerLevel: string;

  /**
   * Address of the job place
   */
  address: string;

  /**
   * Contact persons phone number
   */
  phoneNumber: string;

  /**
   * Show before regular jobs without feature
   */
  showFeatured: boolean;

  /**
   * expiring date for recruiters to view the job applications
   */
  applicationProcessExpiringDate: Date;
}

const JobSchema: Schema<Job> = new Schema({
    creator: {
      type:     String,
      required: true
    },
    startDate: {
      type:     Date,
      required: true
    },
    endDate: {
      type:     Date,
      required: true
    },
    salaryStart: {
      type:     Number
    },
    salaryEnd: {
      type:     Number
    },
    url: {
      type:     String
    },
    jobType: {
      type:     Number,
      required: true
    },
    category: {
      type:     String,
      required: true
    },
    location: {
      type:     String,
      required: true
    },
    title: {
      type:     String,
      required: true      
    },
    description: {
      type:     String,
      required: true
    },
    tags: {
      type:     [String]
    },
    contactPerson: {
      type:     String,
      required: true
    },
    email: {
      type:     String,
      required: true,
      maxlength: 320
    },
    qualification: {
      type:     Number
    },
    careerLevel: {
      type:     Number,
      required: true
    },
    address: {
      type:     String,
      required: true
    },
    phoneNumber: {
      type:     String,
      required: true
    },
    showFeatured: {
      type:     Boolean,
      required: true,
      default:  false
    },
    applicationProcessExpiringDate: {
      type:     Date
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' }});

export const JobModel =  mongoose.model<Job>(MONGOOSE_MODEL_NAMES.Job, JobSchema);
