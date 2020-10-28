export const SESSION_TOKEN_CLIENT_EXPIRATION_TIME = 30; // 30 days
export const SESSION_TOKEN_EXPIRATION_TIME = Math.floor(Date.now() / 1000) + (60 * 60) * 24 * SESSION_TOKEN_CLIENT_EXPIRATION_TIME;


export const AGE_LIMIT = 18;

/**
 * The ip of the storage server
 */
export const SFTP_URL = process.env.NODE_ENV === 'development' ? '127.0.0.1' : '';
/**
 * The base url for the storage server
 */
export const SFTP_BASE_PATH = process.env.NODE_ENV === 'development' ? 'sftpuser' : '';
export const SFTP_PASSWORD = process.env.NODE_ENV === 'development' ? '123456' : '';

export const COMPANY_NAME = "";
export const COMPANY_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "";
export const COMPANY_URL_BACKEND = process.env.NODE_ENV === 'development' ? "http://localhost:8080" : COMPANY_URL;
export const COMPANY_ID = "";

/**
 * Email subjects
 */
export const REGISTERED_USER_MAIL_SUBJECT = `Thank you for joining ${COMPANY_NAME}.`;
export const SUBSCRIBED_JOBS_EMAIL_SUBJECT = `Job listings for search word:`;
export const RESEND_EMAIL_ACTIVATION_USER_MAIL_SUBJECT = `Email activation link`;
export const RESET_PASSWORD_USER_MAIL_SUBJECT = `Reset your password`;
export const PURCHASED_USER_MAIL_SUBJECT = `Thank you for purchasing from us`;

/**
 * Recaptcha secret key
 */
export const RECAPTCHA_SECRET_KEY = '6LeK36EUAAAAAOZ8YgSmbD1EHEvRgu_HMUBHREu9';
export const RECAPTCHA_SITE_KEY = '6LeK36EUAAAAAKrV0IFU1jx_g_ejc3uK3rRZZHhs';
export const VAT_PERCENTAGE = 0.24; // 24 percent vat

export const DATE_FORMAT = 'DD.MM.YYYY';
export const DATE_FILE_FORMAT = 'DD-MM-YYYY';
export const DATE_TIME_FILE_FORMAT = 'DD-MM-YYYY-hhmmss';
export const DATE_MONTH_FILE_FORMAT = 'DD.MM.YYYY';
export const DATE_TIME_FORMAT = 'dddd DD.MM.YYYY hh:mm:ss';

/**
 * Maximum backups for mongodb
 */
export const MAX_MONGODB_BACKUP = 60;

/**
 * Activation code expiration time
 */
export const ACTIVATION_CODE_EXPIRATION = 1; // days

/**
 * Rate limit to block bruteforce attacks for email address confimation
 */
export const RATE_LIMIT_CONFIRMATION_MAX = 15; 
export const RATE_LIMIT_CONFIRMATION_WINDOW = process.env.NODE_ENV === 'development' ? 60 * 240 * 1000 : 0;  // freezes ip for 240 minute

/**
 * Rate limit to block bruteforce attacks for user login
 */
export const RATE_LIMIT_USER_LOGIN_MAX = 10; 
export const RATE_LIMIT_USER_LOGIN_WINDOW = process.env.NODE_ENV === 'development' ? 60 * 60 * 1000 : 0;  // freezes ip for 60 minute

/**
 * Rate limit to block bruteforce attacks for email address confimation
 */
export const RATE_LIMIT_ADMIN_LOGIN_MAX = 5; 
export const RATE_LIMIT_ADMIN_LOGIN_WINDOW = process.env.NODE_ENV === 'development' ? 60 * 60 * 1000 * 12 : 0;  // freezes ip for 12 hours 

/**
 * Password salt rounds
 */
export const PASSWORD_SALT_ROUNDS = 12;

/**
 * MySQL password
 */
export const MYSQL_PASSWORD = process.env.NODE_ENV === 'development' ? 'Password' : '';

/**
 * Mongo DB password
 */
const MONGO_PASSWORD = process.env.NODE_ENV === 'development' ? 'example' : '';
/**
 * Mongo db url
 */
export const MONGO_DB_URL =`mongodb://${encodeURIComponent('root')}:${encodeURIComponent(MONGO_PASSWORD)}@localhost:27017/db?authSource=admin`;

/**
 * Available user roles
 */
export const USER_ROLES = {
    employer:   'employer',
    employee:   'employee',
    admin:      'admin'
}

/**
 * Maximum length of fields
 */
export const MAX_LENGTH = {
    job: {
        title:          40,
        description:    3000,
        name:           60, 
        contactPerson:  120, // contact person full name
        tagsArrayLimit: 10, //max amount of tags
        tags:           20,  //max length of tag
        startDate:      1,  // max startDate (in months)
    },
    employee: {
        description:    1000,
        jobTitle:       60,
        tagsArrayLimit: 5,  //max amount of tags
        tags:           20,  //max length of tag
        searchWord:     30,
        jobAlerts:      5, // max amounts of alerts
        attachments:    5
    },
    employer: {
        description:        2000,
        companyId:          50,
        profileImageSize:   2, // mega bytes
        tagsArrayLimit:     5,  //max amount of tags
        tags:               20  //max length of tag
    },
    resume: {
        title:          65,
        name:           65,
        description:    1000
    },
    address:        150,
    companyName:    100,
    phoneNumber:    15,
    email:          320,
    url:            2000, // generally url
    name:           60, // generally first name & lastname,
    password:       60,
    application: {
        coverletter:    1500
    }
}

/**
 * File size limits
 */
export const MAX_FILE_SIZE_LIMITS = {
    Documents: 1 * 1000 * 1000,     // in bytes = 1mb
    ProfilePic: 0.5 * 1000 * 1000,  // in bytes = 0.5mb
    fileNameLength: 100             // in chars
}

/**
 * Code set types that are available
 */
export const CODESETS = {
    jobType: 'jobType',
    qualificationLevel: 'qualificationLevel',
    careerLevel: 'careerLevel',
    companySize: 'companySize',
    emailFrequency: 'emailFrequency',
    productName: 'productName',
    jobApplicantSearchOptions: 'jobApplicantSearchOptions'
}

/**
 * Used for sendin email of open jobs
 */
export const EMAIL_FREQUENCY = {
    onceAday    : 1, // once a day
    every3Days  : 2, // every 3 days
    onceAweek   : 3  // once a week
}

/**
 * Main categories
 */
export const TOP_CATEGORIES = {
    developmentAndTourism: "1",
    logitistics: "2",
    literatureAndArt: "3",
    business: "4",
    broadcastingAndEntertainment: "5",
    informationTechnology: "6",
    lawAndOrder: "7",
    retail: "8",
    education: "9",
    scientificWork: "10",
    healthCareAndSocialWork: "11",
    otherProfessions: "12",
}

/**
 * product names
 */
export const CODESET_PRODUCT_NAMES = {
    jobPost: 1,
    frontPageAdvertisement: 2,
    featuredAdvertisement: 3,
    free: 4,
    bronze: 5,
    silver: 6,
    gold: 7
}

/**
 * product names
 */
export const CODESET_JOB_APPLICANT_SEARCH_OPTIONS = {
    Name: '1',
    Skill: '2',
    Letter: '3'
}


/**
 * Mongoose model names
 */
export const MONGOOSE_MODEL_NAMES = {
    Job: 'Job',
    User: 'Users',
    Applications: 'Applications',
    Packages: 'Packages',
    PurchasedItems: 'UserPackage',
    Transactions: 'Transaction',
    ActivationCodes: 'ActivationCode',
    JobAdvertisement: 'JobAdvertisement',
    JobAlertModel: 'AlertModel'
}

export const PAYMENT_INSTRUMENT_TYPES = (payment_method: string):string => {
    switch(payment_method){
        case "android_pay_card": 
            return "Google Pay"
        case "apple_pay_card":
            return "Apple Pay";
        case "credit_card":
            return "Credit card";
        case "masterpass_card":
            return "Masterpass";
        case "paypal_account":
            return "Paypal";
        case "paypal_here":
            return "Paypal";
        case "samsung_pay_card":
            return "Samsung Pay";
        case "us_bank_account":
            return "US bank";
        case "venmo_account":
            return "Venmo";
        case "visa_checkout_card":
            return "Visa checkout";
        default:
            return '';
    }
}

export const PURCHASED_PRODUCT_NAME = {
    additionalFeatures: 'additional-features',
    name:               'free',
    noExtraFeatures:    'no-extra-features'
}

/**
 * Job application processing time when application advertisement has ended 
 */
export const JOB_PROCESSING_EXPIRATION = 2; //months