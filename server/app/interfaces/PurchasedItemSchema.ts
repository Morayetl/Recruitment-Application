/**
 * This Mongoose model saves Users transactions
 */
import { MAX_LENGTH, MONGOOSE_MODEL_NAMES } from "../utils/Constants";
import mongoose, { Schema, Document } from 'mongoose';

/**
 * user payment informations
 */
export interface UserPackageUserInfos{
  lastname:     string;
  firstname:    string; // name of the package/product
  companyId:    string; // amount of posts
  email:        string; // remaining amount of posts
  companyName:  string;
  address:      string;
  location:     string;
}

export type UserPackageUserInfosDocument = UserPackageUserInfos & Document;

export interface PurchasedItem{
  userId:         string;
  name:           string; // name of the package/product
  amount:         number; // amount of posts
  remaining:      number; // remaining amount of posts
  endDate:        Date;   // date till package is valid
  created?:       Date;   // date that transaction was made && will be generated automatically
  packagePriceId: string; // package price id
  transactionId:  string;
  transactions:   UserPackageTransaction;
  userInfos:      UserPackageUserInfos;
  paymentMethod:  string;
  vatPercentage:  number;
}

export type PurchasedItemDocument = PurchasedItem & Document;

export interface UserPackageTransaction{
  items: Array<Item>;
  total: number;
}

export type UserPackageTransactionDocument = UserPackageTransaction & Document;

export interface Item extends Document{
  itemId:     number;   // you can find in codeset what the number represents
  price:      number;
}

export type ItemDocument = Item & Document;

export const UserInfosSchema: Schema<UserPackageUserInfosDocument> = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, {_id: false});

export const ItemSchema: Schema<ItemDocument> = new Schema({
  itemId: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
});

export const UserPackageTransactionSchema: Schema<UserPackageTransactionDocument> = new Schema({
  items: {
    type: [ItemSchema],
    default:[]
  },
  total: Number   // total price (vat included)
});

export const UserJobPackagesSchema: Schema<PurchasedItemDocument> = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },  
  vatPercentage: {
    type: Number
  },
  remaining: {
    type: Number,
    required: true
  },
  endDate:{
    type: Date,
    required: true
  },
  packagePriceId:{
    type: String,
    required: true
  },
  paymentMethod: {
    type: String
  },
  transactionId: {
    type: String
  },
  transactions: {
    type: UserPackageTransactionSchema,
    required: true,
    default: {}
  },
  userInfos: {
    type: UserInfosSchema
  }
}, { timestamps: { createdAt: 'created', updatedAt: 'modified' }});

export const PurchasedItemsModel =  mongoose.model<PurchasedItemDocument>(MONGOOSE_MODEL_NAMES.PurchasedItems, UserJobPackagesSchema);