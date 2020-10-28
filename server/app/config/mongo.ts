import mongoose from "mongoose";
import { UserModel } from "../interfaces/User";
import { JobModel } from "../interfaces/Job";
import { ApplicationModel } from "../interfaces/Application";
import { PackageModel } from "../interfaces/Package";
import { PurchasedItemsModel } from "../interfaces/PurchasedItemSchema";
import { TransactionsModel } from "../interfaces/Transaction";
import { ActivationCodeModel } from "../interfaces/ActivationCode";
import { JobAdvertisementModel } from "../interfaces/JobAdvertisement";
import { JobAlertModel } from "../interfaces/JobAlert";

import { MONGO_DB_URL } from "utils/Constants";
import { pinoLogger } from "utils/pino-logger";
const path = require('path');
const logger = pinoLogger;
const fs = require("fs");

// create mongodb backup folder if it doesnt exist
if (!fs.existsSync('mongo-backup')) {
  fs.mkdirSync('mongo-backup');
}

export const MongoClient = require('mongodb').MongoClient;
export const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

async function connect() {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

  } catch (e) {
    logger.fatal([e, 'MONGO_CONNECT']);
  }
}
connect();

export const Jobs = JobModel;
export const Users = UserModel;
export const Applications = ApplicationModel;
export const Packages = PackageModel;
export const PurchasedItems = PurchasedItemsModel;
export const Transactions = TransactionsModel;
export const ActivationCodes = ActivationCodeModel;
export const JobAdvertisements = JobAdvertisementModel;
export const JobAlerts =  JobAlertModel;