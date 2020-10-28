export const USER_ROLES = {
    employer:   'employer',
    employee:   'employee',
    admin:      'admin'
}

export const COOKIES_SECURE = process.env.NODE_ENV === 'development' ? false: true;
export const CONTACT_EMAIL = "";
export const APP_WEBSITE = "http://localhost:3000";  // its used in privacy policy and terms and condtion, make sure its correct
export const APP_NAME ="App name";
export const APP_PHONENUMBER ="(phone number)";
export const APP_COMPANY_ID ="company Id";
export const ADDRESS = "Address 123"
export const SUPPORT_EMAIL ="support@localhost.com";

export const APP_BACKEND_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'http://localhost:8080/api';

export const APP_SOCIAL_MEDIA = {
    INSTAGRAM: '#',
    TWITTER:    '#'
}

export const DATE_FORMAT = 'DD.MM.YYYY';

/**
 * Age limit for using the application
 */
export const AGE_LIMIT = 18;

export const APP_LOGO_URL = ""

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
        coverletter:    1500,
    }
}

/**
 * Minimum length of fields
 */
export const MIN_LENGTH = {
    password: process.env.NODE_ENV === 'development' ? 3 : 8
}

/**
 * File limits for uploading
 */
export const MAX_FILE_SIZE_LIMITS = {
    Documents: 1 * 1000 * 1000,     // in bytes = 1mb
    ProfilePic: 0.5 * 1000 * 1000,  // in bytes = 0.5mb
    fileNameLength: 100             // in chars
}

export const CODESETS = {
    jobType: 'jobType',
    qualificationLevel: 'qualificationLevel',
    careerLevel: 'careerLevel',
    companySize: 'companySize',
    emailFrequency: 'emailFrequency',
    jobApplicantSearchOptions: 'jobApplicantSearchOptions'
}

export const TOP_CATEGORIES = {
    developmentAndTourism: "1",
    logistics: "2",
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

export const RECAPTCHA_SITE_KEY = '6LeK36EUAAAAAKrV0IFU1jx_g_ejc3uK3rRZZHhs';

export const COOKIES = {
    authorization: 'authorization',
    cookiePolicyAgreement: 'cookie-policy-agreement',
    role: 'role',
    language: 'language'
}