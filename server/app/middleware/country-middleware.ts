import { Request, Response, NextFunction } from "express";
import connection from '../config/mysql';
import mysql from 'mysql';
import * as _ from 'lodash';

/**
 * Middleware for searching for country, state and city
 * @param req 
 * @param res 
 * @param next 
 */
export const countrySearchMiddleWare = function (req: Request , res: Response, next: NextFunction) {

    const location = req.body.location;

    if(!_.isEmpty(location) && _.isString(location)) {
        let query = ``;
        const splittedLocation = location.split('/');
        const type = splittedLocation[0];
        let id=mysql.escape(splittedLocation[1]);

        switch(type){
            case 'city':
                query = `SELECT concat('city/',city.id) as type 
                FROM cities city
                left join countries country on city.country_code=country.iso2
                left join states state 
                on (city.country_code=state.country_code and city.state_code=state.iso2)
                WHERE city.id = ${id}`;
                break;

            case 'state':
                query=`SELECT concat('city/',city.id) as type 
                FROM cities city
                WHERE city.state_id=${id}
                union
                Select concat('state/',state.id) as type 
                    FROM states state
                    WHERE id=${id}`;
                break;
            case 'country':
                query=`SELECT * from (
                    (Select concat('state/',states.id) as type 
                    FROM states
                        left join countries country on states.country_id=country.id
                        Where country.id=${id})
                    union
                    (Select concat('city/',city.id) as type 
                    FROM cities city
                        left join countries country on city.country_id=country.id
                        Where country.id=${id})
                    union
                    (Select concat('country/',country.id) as type 
                        FROM countries country
                        where id=${id})
                        ) as result`;
                break;
            default:
                query = '';
        }

        if(!query){
            res.locals.location = [];
            return;
        }

        connection.query(query,
        function (error: any, results: any, fields: any) {
            if (error) throw error;

            if (results) {
                res.locals.location = results;
            } else {
                res.locals.location = [];
            }
            next();
        });
    } else {
        res.locals.location = [];
        next();
    }
}