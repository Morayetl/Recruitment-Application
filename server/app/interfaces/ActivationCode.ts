/**
 * This Mongoose model saves Users transactions
 */
import mongoose, { Schema, Document } from 'mongoose';
import { MONGOOSE_MODEL_NAMES, ACTIVATION_CODE_EXPIRATION } from 'utils/Constants';
import moment = require('moment');

export interface ActivationCode extends Document{
  token:     string;   // activation code
  type:     'activate-user' | 'reset-password';   // posted job id
  email:    string;
}

export const ActivationCodeSchema: Schema<ActivationCode> = new Schema({
  email:{
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['activate-user', 'reset-password']
  },
  token: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
    default: moment().add(ACTIVATION_CODE_EXPIRATION, 'days').toDate()
  }
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' }});

export const ActivationCodeModel =  mongoose.model<ActivationCode>(MONGOOSE_MODEL_NAMES.ActivationCodes, ActivationCodeSchema);