import { Request, Response, NextFunction } from "express";
import express = require('express');
var router: express.Router = express.Router()
import { jwtAuthorizeUserMiddleWare } from "utils/JsonWebToken";
import UserAccessMiddleWare from "utils/user-access-middleware";
import { USER_ROLES, SFTP_BASE_PATH } from "utils/Constants";
import { protectedFileAccess } from "utils/File";
import sftp from '../config/sftp';

router.use(function (req: Request , res: Response, next: NextFunction) {
    const urlPath = req.url.split('/').filter(o => o);

    if(urlPath.length > 1){
        return res.sendStatus(403);
    }

    next();
})

// define the home page route
router.get('/:filename', jwtAuthorizeUserMiddleWare,UserAccessMiddleWare([USER_ROLES.employer,USER_ROLES.employee, USER_ROLES.admin]),function (req: Request , res: Response, next: NextFunction) {

    // used when employer wants to access employees attachments
    const employeeId = req.query.id;
    protectedFileAccess(res.locals.decodedCredentials.data.id, employeeId,req.params.filename, 
        async function(allowed){
            if(allowed){
                try{
                    // get the file trough ftp and send it
                    const buffer = await sftp.get(SFTP_BASE_PATH + '/private/' + req.params.filename);
                    return res.send(buffer)                    
                }catch(e){
                    req['log'].error([e, 'PRIVATE_FILE_ACCESS']);
                    res.sendStatus(500);
                }

            }
            
            return res.sendStatus(403);
        }
    )
})

export default router;