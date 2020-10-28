import axios from "../../Utils/axios";
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import i18next from "i18next";

export const compareToFirstPassword = (form) => (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback(i18next.t('error-message-password-dont-match'));
    } else {
      callback();
    }
};

export const urlMatching = (page) => {
  return (rule, value, callback) => {
    if(!value){
      callback();
      return;
    }

    const urls = {
      facebook: 'facebook.com',
      twitter:  'twitter.com',
      linkedin:  'linkedin.com',
      google:   'google.com',
      github:   'github.com'
    }
    //const regex = /(http(s)?:\/\/)?(www\.)?(´facebook.com´)(\/)([-a-zA-Z0-9@:%_+.~#?&=]*)/g;
    const regex = new RegExp(`^(http(s)?://)(www.)?(${urls[page]})(/)?([-a-zA-Z0-9@:%_+.~#?&=]*)`)
    const result = value.match(regex);
    if(result){
      callback();
    }
    if(!result && value){
      callback(i18next.t('error-message-invalid-url'))
    }
  }
}


/**
 * basic url validation
 */
export const urlValidator = (rule, value, callback) => {
  if(!value){
    callback();
    return;
  }

  const regex = new RegExp('^(https?:\\/\\/)'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  const result = value.match(regex);

  if(result){
    callback();
    return;
  }

  if(!result && value){
    callback(i18next.t('error-message-invalid-url'))
  }
}

/**
 * check if user exists
 */
export const userExists = (rule, value, callback) => {
  if(!value){
    callback();
    return;
  }

  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const result = value.match(regex);
  if(result){
    axios.get('/user/exists/'+value).then(res => {
      if(res.data.exists){
        callback(i18next.t('email-is-in-use'));
      }else {
        callback();
      }    
  })
  }else{
    callback();
  }
}

/**
 * maximum length of array
 */
export const maxArrayLength = (max = 10) => (rule, value, callback) => {
  if (value) {
    if (value.length > max) {
      callback(i18next.t('error-message-max-amount-item', {max}));
    } else if (value.length <= max) {
      callback();
    }
  }else{
    callback();
  }
}

/**
 * maximum string length of item in array
 * @param {*} max 
 */
export const maxStringLengthInArray = (max = 10) => (rule, value, callback) => {
  
    if (value) {
      let isOverMax = false;
      
      value.map((val) => {
        if(val.length > max){
          isOverMax = true;
        } 
        return null;
      });

      if(isOverMax){
        callback(i18next.t('error-message-max-character', {max}));
        
      }else{
        callback();
      }
  }else{
    callback();
  }
}

/** 
 * for validating phone numbers
*/
export const validatePhoneNumber = (rule, value, callback) => {
  if(!value){
    callback();
    return;
  }

  // checks that number starts with + and continues with number
  const regex = /^\+\d*$/;
  const phoneNumber = parsePhoneNumberFromString(value)
  if(phoneNumber && phoneNumber.isValid() && value.match(regex)){
    callback();
  }else{
    callback(i18next.t('error-message-invalid-phone-number'));
  }
}

/**
 * Checks if startDate is before endDate
 */
export const startDateBeforeEndDate = (form) => (rule, value, callback) => {
  // startDate is moment
  const startDate = form.getFieldValue('startDate');
  if(!startDate){
    callback();
    return;
  }

  if (startDate.set({hour:0,minute:0,second:0,millisecond:0}).isSameOrAfter(value)) {
    callback(i18next.t('error-message-end-date-before-start-date'));
  } else {
    callback();
  }
};