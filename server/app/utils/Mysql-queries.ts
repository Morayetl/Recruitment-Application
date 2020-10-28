import connection from "../config/mysql"
import * as _ from 'lodash';

/**
 * gets codeset by type and value
 * @param type 
 * @param value 
 */
export function getCodeSetByValue(type:string, value:number): Promise<any>{
    return new Promise(async(resolve,reject) => {

        connection.query('Select * from codesets where type = ? and value = ?',
        [type, value],
          function (error: any, results: any, fields: any) {
          if (error) return reject(error);
          if (results) {
            
            return resolve(results[0]);
          } else {
            return resolve('');
          }
        });     
    });
}

export function getLocationNameByCode(code:string): Promise<string>{
  return new Promise(async(resolve,reject) => {
    if(!code || !_.isString(code)){
      resolve('');
      return;
    }
    const splittedValue = code.split('/');
    const type = splittedValue[0];
    let query = ``;
    const id = parseInt(splittedValue[1]);      
    switch(type){
      case 'state':
        query=`Select concat(states.name,', ',country.name) as name from states
          left join countries country on states.country_id=country.id
          where states.id=${id}`;
        break;
      case 'city':
        query=`Select concat(city.name,', ',state.name,', ',country.name) as name from cities city 
        left join countries country on city.country_id=country.id
        left join states state on city.state_id=state.id
        where city.id=${id}`;
        break;
      case 'country':
        query=`Select country.name from countries country where id=${id}`;                    
        break;
    }

    if(!query){
      resolve('');
      return;
    }

    connection.query(query,
      function (error: any, results: any, fields: any) {
      if (error) return reject(error);
      
      if (results.length > 0) {
        return resolve(results[0].name);
      } else {
        return resolve('');
      }
    });      
  });
}

/**
 * 
 * @param latitude current latitude of user
 * @param longitude current longitude of user
 * @param area radius in miles
 */
export function getNearestLocationsByCordination(latitude:number, longitude:number, area = 30): Promise<Array<any>>{
  const sql = `SELECT id,name, latitude, longitude, SQRT(
      POW(69.1 * (latitude - ?), 2) +
      POW(69.1 * (? - longitude) * COS(latitude / 57.3), 2)) AS distance
  FROM cities HAVING distance < ? ORDER BY distance`;

  return new Promise((resolve:any, reject:any) => {
      connection.query(sql,
      [latitude, longitude, area],
      function (error: any, results: Array<any>, fields: any) {
          if (error) return reject(error);
          if (results && results.length > 0) {
              resolve(results);
          }else{
            resolve([]);     
          }
      });    
  })
}