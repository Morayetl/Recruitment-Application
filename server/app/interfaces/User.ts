import mongoose, { Document, Schema, Query } from "mongoose";
import { USER_ROLES, MAX_LENGTH, MONGOOSE_MODEL_NAMES, MAX_FILE_SIZE_LIMITS, AGE_LIMIT } from "../utils/Constants";
import ResumeSchema, { Resume } from "./Resume";
import moment = require("moment");

export interface Attachment{
  _id?:           mongoose.Types.ObjectId;
  originalName:   string;
  name:           string; // file name in server
  mimeType:       string; // file type
  created?:        Date;
}
export interface User extends Document{
  created:        Date;
  role:           string,
  modified:       Date;
  email:          string;
  password:       string;
  companyProfile: CompanyProfile;
  userProfile:    UserProfile;
  resume:         Resume;
  userVerified:   boolean;  // verification if its real user
  emailVerified:  boolean;  // for user activation
  lastLogin:      Date;
  expireDate:   Date;
}

export interface Urls{
  homePageUrl:      string;
  facebookPageUrl:  string;
  linkedinPageUrl:  string;
  twitterPageUrl:   string;
  googlePageUrl:    string;
  githubPageUrl:    string;
}

export interface UserProfile{
  jobTitle:     string;
  firstname:    string;
  lastname:     string;
  number:       string;
  description:  string;
  location:     string;
  address:      string;
  urls:         Urls;
  attachments:  Array<Attachment>;
  birthday:     Date;
}

export interface CompanyProfile{
  image:            string; // url of company profile image
  name:             string; // name of the company
  firstname:        string;
  lastname:         string;
  number:           string;
  description:      string;
  address:          string;
  companySize:      number;
  location:         string;
  urls:             Urls;
  establishingYear: Date;
  companyId:        string;
  tags:             string;
  birthday:         Date;
}

const AttachmentSchema: Schema<Attachment & Document> = new Schema({
  originalName: {
    type: String,
    maxlength: MAX_FILE_SIZE_LIMITS.fileNameLength,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  }
}, { timestamps: { createdAt: 'created'}});
const UrlsSchema: Schema<Urls> = new Schema({
  homePageUrl: {
    type: String,
    maxlength: MAX_LENGTH.url,
    default: ''
  },
  facebookPageUrl: {
    type: String,
    maxlength: MAX_LENGTH.url,
    default: ''
  },
  linkedinPageUrl: {
    type: String,
    maxlength: MAX_LENGTH.url,
    default: ''
  },
  twitterPageUrl: {
    type: String,
    maxlength: MAX_LENGTH.url,
    default: ''
  },
  googlePageUrl: {
    type: String,
    maxlength: MAX_LENGTH.url,
    default: ''
  },
  githubPageUrl: {
    type: String,
    maxlength: MAX_LENGTH.url,
    default: ''
  }  
}, { _id: false, id: false });

const UserProfileSchema: Schema<UserProfile & Document> = new Schema({
  jobTitle: {
    type:       String,
    maxlength:  MAX_LENGTH.employee.jobTitle
  },
  firstname: {
    type:       String,
    maxlength:  MAX_LENGTH.name,
    required:   true
  },
  lastname: {
    type:       String,
    maxlength:  MAX_LENGTH.name,
    required:   true
  },  
  number: {
    type:       String,
    maxlength:  MAX_LENGTH.phoneNumber,
    required:   true
  },
  address: {
    type: String,
    maxlength: MAX_LENGTH.address,
    required: true
  },
  description: {
    type:       String,
    maxlength:  MAX_LENGTH.employee.description
  },
  location: {
    type:       String,
    required:   true
  },
  urls:         UrlsSchema,
  attachments: {
    type:       [AttachmentSchema],
    default:    []
  },
  birthday: {
    type:       Date,
    required:   true,
    default:    moment().subtract(AGE_LIMIT,'year').toDate()
  }
},{ _id: false, id: false });

const CompanyProfileSchema: Schema<CompanyProfile & Document> = new Schema({
  image: {
    type: String
  },
  name: {
    type: String,
    maxlength:  MAX_LENGTH.companyName,
    required: true
  },
  firstname: {
    type:       String,
    maxlength:  MAX_LENGTH.name,
    required:   true
  },
  lastname: {
    type:       String,
    maxlength:  MAX_LENGTH.name,
    required:   true
  },
  number: {
    type: String,
    maxlength: MAX_LENGTH.phoneNumber,
    required: true
  },
  description: {
    type: String,
    maxlength: MAX_LENGTH.employer.description
  },
  location: {
    type: String,
    required: true
  },
  establishingYear: {
    type: Date,
    required: true
  },
  companySize: {
    type: Number,
    required: true
  },
  companyId: {
    type: String,
    required: true,
    maxlength: MAX_LENGTH.employer.companyId
  },
  address: {
    type: String,
    maxlength: MAX_LENGTH.address,
    required: true
  },
  urls: UrlsSchema,
  tags: {
    type:     [String]
  },
  birthday: {
    type:       Date,
    required:   true
  }
}, { _id: false, id: false });

const UserSchema: Schema<User> = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: { 
    type: String,
    required: true, 
    maxlength: MAX_LENGTH.email,
    unique: true
  },
  password: {
    type: String,
    maxlength: MAX_LENGTH.password,
    required: true
  },
  companyProfile: {
    type: CompanyProfileSchema
  },
  userProfile: {
    type: UserProfileSchema
  },
  role: {
    type: String,
    required: true,
    enum: [USER_ROLES.admin, USER_ROLES.employer,USER_ROLES.employee],
  },
  resume: {
    type: ResumeSchema,
    default: {}
  },
  userVerified: {
    type: Boolean,
    default: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  },
  expireDate: {
    type: Date,
    default: moment().add(3, 'day').toDate()
  }
  
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' }});

/**
 * Company profile is required if user role is employer
 */
UserSchema.obj.companyProfile.required = function() {
  return this.role === USER_ROLES.employer;
};

/**
 * User profile is required if user role is employee
 */
UserSchema.obj.userProfile.required = function() {
  return this.role === USER_ROLES.employee;
};

/*MessageSchema.obj.url.required = function() {
  return this.type === 'image' || this.type === 'voice';
};*/

// Export the model and return your IUser interface
export const UserModel =  mongoose.model<User & Document>(MONGOOSE_MODEL_NAMES.User, UserSchema);
