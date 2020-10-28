import { Request, Response  } from "express";
import { RequestHandlerParams } from "express-serve-static-core";
import { Users } from "config/mongo";

const jwt = require('jsonwebtoken');
const secret = 'secret';

/**
 * defines which user roles are allowed to access endpoint
 * add this functionality after JSONwebtoken decoding
 * @param userRoles 
 * @type Array<string>
 */
const UserAccessMiddleWare = (userRoles: Array<string>) => async function (req: Request, res: Response, next: any){
    const authorization = req.headers.authorization;
    const token = authorization ? authorization.split(" ")[1] : null;
    let hasAccess = false;

    if(!res.locals.decodedCredentials){
        res.sendStatus(401);
        res.end();
    }
    const user = await Users.findById(res.locals.decodedCredentials.data.id).countDocuments().exec();

    // checks if user exists
    if(!user){
        res.sendStatus(401);
        res.end();
    }

    userRoles.map(role => {
        if(role === res.locals.decodedCredentials.data.role){
            hasAccess = true;
            next();
        }
    })

    if(!hasAccess){
        res.sendStatus(403);
        res.end();
    }
};

export default UserAccessMiddleWare;