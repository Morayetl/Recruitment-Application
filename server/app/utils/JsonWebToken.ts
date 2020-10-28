import { Request, Response  } from "express";
import { SESSION_TOKEN_EXPIRATION_TIME } from "./Constants";

const jwt = require('jsonwebtoken');
const secret = 'secret';

const sign = function (email: string, role: string, id:number) {
    return jwt.sign({
        exp: SESSION_TOKEN_EXPIRATION_TIME, // 1 week
        data: { email: email, role: role , id: id}
    }, secret);
};

const verify = function(token: string) {
    return jwt.verify(token, secret);
};

export const jwtAuthorizeUserMiddleWare = function (req: Request, res: Response, next: any){
    const authorization = req.headers.authorization || req.cookies.authorization;

    let token = ''
    if(authorization){
        token = authorization ? authorization.split(" ")[1] : '';
    }else{
        // unauthorized
        res.sendStatus(401);
        res.end();
    }
    
    if(token) {
        try{
            const decoded =  verify(token); 
            if(decoded){
                res.locals.decodedCredentials = decoded;
                next();    
            }
        } catch(e) {
            // forbidden if it cant be decoded, it means the token is fake or old
            // user is unauthorized
            res.sendStatus(401);
            res.end();
        }
        
    }    
};

export default {sign, verify};