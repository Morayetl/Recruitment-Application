import { Response, Request } from "express";
import connection from "../config/mysql"
import {groupBy} from 'lodash';
import mysql from 'mysql';
import * as _ from 'lodash';
import { getLocationNameByCode, getNearestLocationsByCordination } from "../utils/Mysql-queries";

export async function getCountriesAndCities(req: Request, res: Response) {
    // gives the possibility to only select country, state, or city
    const option: 'country' | 'state' | 'city' = req.query.option;
    const query = mysql.escape('%' + req.query.query + '%');
    let sql;

    switch(option){
        case 'country':
            sql = `SELECT countries.id, countries.name as value,'country' as type
            FROM countries WHERE countries.name like ${query} LIMIT 6`;
            break;

        case 'state':
            sql = `SELECT states.id, concat(states.name,', ',country.name) as value,'state' as type
                FROM states
                left join countries country on states.country_code=country.iso2
                WHERE states.name like ${query} 
                LIMIT 2`;
            break;            

        case 'city':
            sql = `SELECT city.id, concat(city.name,', ', concat(state.name,', '),country.name) as value, 'city' as type
                FROM cities city
                left join countries country on city.country_code=country.iso2
                left join states state 
                on (city.country_code=state.country_code and city.state_code=state.iso2)
                WHERE city.name like ${query}
                LIMIT 6`;
            break;
        default:
            sql = `Select * from(
                ((SELECT city.id, concat(city.name,', ', concat(state.name,', '),country.name) as value, 'city' as type
                FROM cities city
                left join countries country on city.country_code=country.iso2
                left join states state 
                on (city.country_code=state.country_code and city.state_code=state.iso2)
                WHERE city.name like ${query}
                LIMIT 194)
                union
                (SELECT countries.id, countries.name as value,'country' as type
                FROM countries
                WHERE countries.name like ${query} 
                LIMIT 4)
                union
                (SELECT states.id, concat(states.name,', ',country.name) as value,'state' as type
                FROM states
                left join countries country on states.country_code=country.iso2
                WHERE states.name like ${query} 
                LIMIT 2
                )) as result
            )
            ORDER BY value
            LIMIT 200`;
    }


    try{
        await new Promise((resolve:any, reject:any) => {
            connection.query(sql,
            function (error: any, results: any, fields: any) {
                if (error) return reject(error);
                if (results) {
                    const group = _.chain(results)
                    // Group the elements of Array based on `color` property
                    .groupBy('type')
                    // `key` is group's name (color), `value` is the array of objects
                    .map((value, key) => ({ key, group: value }))
                    .sortBy('key')
                    .reverse()    // sort by date descending        
                    .value();
                    res.send(group);
                }

                resolve();
            });    
        })
    }catch(e){
        req['log'].error([e, 'COUNTRY_MODEL_GET_COUNTRIES_AND_CITIES']);
        res.sendStatus(500);
    }

}

/**
 * Get location based on location id
 * @param req 
 * @param res 
 */
export async function getLocationById(req: Request, res: Response) {
    try{    
        const location = await getLocationNameByCode(req.body.location);
        if(location){
            res.send({location});
        }else{
            res.send({});
        }
    }catch(e){
        req['log'].error([e, 'COUNTRY_MODEL_GET_LOCATION_BY_ID']);
        res.sendStatus(500);
    }
}



export async function getAllLanguages(req: Request, res: Response) {
    const sql = 'Select * from languages';

    try{
        await new Promise((resolve:any, reject:any) => {
            connection.query(sql,
            function (error: any, results: any, fields: any) {
                if (error) return reject(error);
                if (results) {
                    // TODO implement languagelist
                    console.log(results);
                }
                resolve();
            }); 
        })
    }catch(e){
        req['log'].error([e, 'COUNTRY_MODEL_GET_ALL_LANGUAGES']);
        res.sendStatus(500);
    }
}

/**
 * Get location based on location id
 * @param req 
 * @param res 
 */
// export async function getNearestCityLocationByCordinates(req: Request, res: Response){
//     const {latitude, longitude,limit}: {latitude:number, longitude:number, limit?:number} = req.query;
//     const maxCities = limit <= 3 ? limit : 3 ;
//     try{
//         const results = await getNearestLocationsByCordination(latitude, longitude);
//         res.send(results);
//     }catch(e){
//         .log(e)
//         req['log'].error([e, 'COUNTRY_MODEL_GET_NEAREST_CITY_BY_CORDINATES']);
//         res.sendStatus(500);
//     }
// }
