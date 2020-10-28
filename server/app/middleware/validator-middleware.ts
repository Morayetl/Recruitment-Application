import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validationResultMiddleWare = function (req: Request , res: Response, next: NextFunction) {

    const err = validationResult(req)
    if(!err.isEmpty()){
      res.status(422).send(err.mapped());
      res.end();
        return;
    }else{
        next();
    }
}