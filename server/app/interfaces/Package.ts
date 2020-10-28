import mongoose, { Document, Schema } from "mongoose";
import { MONGOOSE_MODEL_NAMES } from "utils/Constants";

export interface Price extends Document{
  price:                number;   // in euros
  amountOfPost:         number;
  amountOfFeaturedJob:  number;   // jobs that will show on 
  jobDuration:          number;
  expireTime:           number;   // months
  support:              boolean;
  name:                 string;
}

export interface SingleProduct extends Document{
  name:               string;
  price:              number;
  featurePrice:       number;
  frontPagePrice:     number;
  jobDuration:        number;
  frontPageDuration:  number;
}

export interface Package extends Document{
  gold:       Price;
  silver:     Price;
  bronze:     Price;
  free:       Price;
  single:     SingleProduct;
  creator:    String;       // admin user id
  startDate:  Date;
}

const DiscountCode: Schema<Price> = new Schema({
  name: {
    type:     String,
    required: true
  },
  percent: { 
    type:         Number,
    required:     true
  }
});

/**
 * Sets the price of a single post
 */
const SingleProductSchema: Schema<SingleProduct> = new Schema({
  name: {
    type:     String,
    required: true
  },
  price: { 
    type:     Number,
    required: true
  },
  featurePrice: { 
    type:     Number,
    required: true
  },
  jobDuration: {
    type:     Number,  // days
    default:  21
  },
  frontPagePrice: { 
    type:     Number,
    required: true
  },
  frontPageDuration: {
    type:     Number,
    required: true
  }
});

const PriceSchema: Schema<Price> = new Schema({
  name: {
    type:     String,
    required: true
  },
  price: { 
    type:     Number,
    required: true
  },
  amountOfPost: { 
    type:     Number,
    required: true
  },
  amountOfFeaturedJob: {
    type:     Number,  // amount of jobs that will show in toplist
    default:  0
  },
  jobDuration: {
    type:     Number,  // days
    default:  14
  },
  expireTime: {
    type:     Number,  // months
    default:  6
  },
  support: {
    type:     Boolean,
    default:  false
  }
});

const PackageSchema: Schema<Package> = new Schema({
  gold: { 
    type:         PriceSchema,
    required:     true
  },
  silver: { 
    type:         PriceSchema,
    required:     true
  },
  bronze: {
    type:         PriceSchema,
    required:     true
  },
  free: {
    type:         PriceSchema,
    required:     true
  },
  single:{
    type:         SingleProductSchema,
    required:     true
  },
  creator:        {
    type:         String,
    required:     true,
    default:      'test test' //remove when feature ready
  },
  startDate: {
    type:         Date,   //date that the package deal will start
    required:     true,
    default:      new Date()
  }
},{ timestamps: { createdAt: 'created', updatedAt: 'modified' }});

export const PackageModel =  mongoose.model<Package>(MONGOOSE_MODEL_NAMES.Packages, PackageSchema);