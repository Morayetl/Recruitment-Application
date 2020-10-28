const pino = require('pino');
const path = require('path');

/**
 * Logger for error message
 */
export const pinoLogger = pino({
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters:{
        log: (object:Array<any>) => {
          if(object.length <= 1){
            throw new Error('array length is small, first index is error object, the second is error method');
          }
          const error: Error = object[0];
          const errorMethod = object[1]; // the method where the error was found
    
          if(process.env.NODE_ENV === 'production'){
          }
    
          return {msg: errorMethod, stack:error.toString()};
        }    
    }
  },path.resolve("logs/log.txt"));