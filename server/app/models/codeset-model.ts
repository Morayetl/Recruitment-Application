import { Response, Request } from "express";
import connection from "../config/mysql"

export async function getByCodeSet(req: Request, res: Response) {

    try{
        await new Promise((resolve:any, reject:any) => {
            connection.query('Select * from codesets where type = ?',
            [req.query.type],
            function (error: any, results: any, fields: any) {
                if (error) return reject(error);
                if (results) {
                    res.send(results);
                }
            });   
        })
    }catch(e){
        req['log'].error([e, 'CODESET_MODEL_GET_LEAF_JOB_CATEGORYS']);
        res.sendStatus(500);
    }
 
}

/**
 * Gets single codeset by id and value
 * @param req 
 * @param res 
 */
export async function getByCodeSetByIdAndValue(req: Request, res: Response) {


    try{
        await new Promise((resolve:any, reject:any) => {
            connection.query('Select * from codesets where type = ? and value = ?',
            [req.params.type, req.params.value],
            function (error: any, results: any, fields: any) {
                if (error) return reject(error);
                if (results) {
                    res.send(results[0]);
                }
            });    
        })
    }catch(e){
        req['log'].error([e, 'CODESET_MODEL_GET_LEAF_JOB_CATEGORYS']);
        res.sendStatus(500);
    }
}