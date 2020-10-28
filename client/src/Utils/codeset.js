import axios from "./axios";
import i18next from "i18next";
import { CODESETS } from "./constants";

export const getJobTypeOptions = function() {
    return axios.get('/codeset',{params: {type: 'jobType'}})
    .then((res) => {
      const options = res.data.map(value => {
        return { 
          value: value.value,
          label: value[i18next.languages[0]]
        }
      });
      return options;
    });
}

export const getQualificationLevelOptions = function() {
    return axios.get('/codeset',{params: {type: 'qualificationLevel'}})
    .then((res) => {
      const options = res.data.map(value => {
        return { 
          value: value.value,
          label: value[i18next.languages[0]]
        }
      });
      return options;
    });
}

export const getCareerLevelOptions = function() {
    return axios.get('/codeset',{params: {type: 'careerLevel'}})
    .then((res) => {
      const options = res.data.map(value => {
        return { 
          value: value.value,
          label: value[i18next.languages[0]]
        }
      });
      return options;
    });
}

export const getCompanySizeOptions = function() {
    return axios.get('/codeset',{params: {type: 'companySize'}})
    .then((res) => {
      const options = res.data.map(value => {
        return { 
          value: value.value,
          label: value[i18next.languages[0]]
        }
      });
      return options;
    });
}

export const getEmailFrequencyOptions = function() {
  return axios.get('/codeset',{params: {type: CODESETS.emailFrequency}})
  .then((res) => {
    const options = res.data.map(value => {
      return { 
        value: value.value,
        label: value[i18next.languages[0]]
      }
    });
    return options;
  });
}

export const getCodeSetByTypeAndValue = function(type, value) {
  if(!type || !value){
    return Promise.resolve('');
  }
  return axios.get('/codeset/type/' + type + '/value/' + value)
  .then((res) => {
      const options = { 
        value: res.data.value,
        label: res.data[i18next.languages[0]]
      }
    return options;
  });
}

export const getJobApplicantSearchOptions = function() {
  return axios.get('/codeset',{params: {type: CODESETS.jobApplicantSearchOptions}})
  .then((res) => {
    const options = res.data.map(value => {
      return { 
        value: value.value,
        label: value[i18next.languages[0]]
      }
    });
    return options;
  });
}