import {EMAIL_FREQUENCY} from '../Constants';
import moment from 'moment';


/**
 * Calculates when next alarm is set and what time range to select when sending job alert mail
 * @param emailFrequency 
 */
export const calculateNextAlarm = function(emailFrequency:number, offSetDate?: Date){
    let nextAlarm;
    let currentAlarm;
    const offset: Date = offSetDate ? offSetDate : new Date();
    switch(emailFrequency){
        case EMAIL_FREQUENCY.onceAday:
            nextAlarm = moment(offset).add(1, 'minutes');
            currentAlarm = moment(offset).subtract(1, 'minutes');
            break;
        case EMAIL_FREQUENCY.every3Days:
            nextAlarm = moment(offset).add(3, 'days');
            currentAlarm = moment(offset).subtract(3, 'days');
            break;       
        case EMAIL_FREQUENCY.onceAweek:
            nextAlarm = moment(offset).add(7, 'days');
            currentAlarm = moment(offset).subtract(7, 'days');
            break;           
        default:        
            nextAlarm = moment(offset).add(1, 'days');
            currentAlarm = moment(offset).subtract(1, 'days');
    }

    return { nextAlarm, currentAlarm};
}