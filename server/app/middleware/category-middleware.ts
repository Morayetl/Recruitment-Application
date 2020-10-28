import { Request, Response, NextFunction } from "express";
import connection from '../config/mysql';
import mysql from 'mysql';
import * as _ from 'lodash';

/**
 * Middleware to for getting searched category ids
 * @param req 
 * @param res 
 * @param next 
 */
export const categorySearchMiddleWare = function (req: Request , res: Response, next: NextFunction) {

    const categories = req.body.category;

    if(_.isArray(req.body.category) && !_.isEmpty(categories)) {
        const categories = req.body.category.map((value:string, index: number) =>{
            const addOr = (index > 0) ? 'OR ' : '';
            const query =  addOr + '(categoryId=' + mysql.escape(value) + ' OR categoryId like '+ mysql.escape(value + '/%') +')';
            return query;
        });
    
        const query = "SELECT categoryId FROM A.categories where" + categories.join(" ");
        connection.query(query,
        function (error: any, results: any, fields: any) {
            if (error) throw error;

            if (results) {
                const catgry = results.map((value:any) => value.categoryId);
                res.locals.categories = catgry;
            } else {
                res.locals.categories = [];
            }
            next();
        });
    } else {
        res.locals.categories = [];
        next();
    }
}