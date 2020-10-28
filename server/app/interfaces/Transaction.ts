/**
 * This Mongoose model saves Users transactions
 */
import { MAX_LENGTH, MONGOOSE_MODEL_NAMES } from "../utils/Constants";
import mongoose, { Schema, Document } from 'mongoose';

export interface Transaction extends Document{
  packageId:    string;   // used user package id
  jobId:        string;   // posted job id
  userId:       string;
  jobTitle:     string;
  created:      Date;
  modified:     Date;
}

export const TransactionSchema: Schema<Transaction> = new Schema({
  packageId: {
    type: String,
    required: true
  },
  jobId: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' }});

export const TransactionsModel =  mongoose.model<Transaction>(MONGOOSE_MODEL_NAMES.Transactions, TransactionSchema);