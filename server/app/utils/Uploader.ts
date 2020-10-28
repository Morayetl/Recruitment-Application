import multer = require("multer");
import { MAX_FILE_SIZE_LIMITS } from "./Constants";
const multerInstance = require('multer');

export const uploadProfilePic = multerInstance({
    storage: multer.memoryStorage(), // saves file temporarily to memory and sends it to ftp server
    limits:{
        fileSize: MAX_FILE_SIZE_LIMITS.Documents
    },
    fileFilter: (req:any, file:Express.Multer.File, cb:any) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);

            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

export const uploadDocument = multerInstance({
    storage: multer.memoryStorage(), // saves file temporarily to memory and sends it to ftp server
    limits:{
        fileSize: MAX_FILE_SIZE_LIMITS.Documents
    },
    fileFilter: (req:any, file:Express.Multer.File, cb:any) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);

            return cb(new Error('Only .png, .jpg and .jpeg and pdf format allowed!'));
        }
    }
});