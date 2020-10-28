import Axios from "axios";
import cookie from 'js-cookie';
import { COOKIES, APP_BACKEND_BASE_URL } from "./constants";
import { notification } from "antd";
import i18next from "i18next";


var axios = Axios.create({
    baseURL: APP_BACKEND_BASE_URL,
    timeout: 15000
  });


// Add a request interceptorauthorization
axios.interceptors.request.use(function (request) {
  const auth = cookie.get('authorization');

  if(auth){
    request.headers.Authorization = auth;
    request.withCredentials = true
  }
  
  return request;
}, function (error) {
  return Promise.reject(error);
});  


  // Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  const status = error.response && error.response.status ? error.response.status : null;

  // if status equal or bigger than 500, show error
  if(status >= 500){
    notification['error']({
      message: i18next.t('something-went-wrong'),
      duration: 5,
      description:
        ''
    });
  }
  // if status unauthorized remove cookies and redirect user to home
  if(status === 401){
    cookie.remove(COOKIES.authorization);
    cookie.remove(COOKIES.role);
    window.location = "/";
  } 

  if(!status){
    notification['error']({
      message: i18next.t('network-error'),
      duration: 5,
      description:
        ''
    });
  }

  return Promise.reject(error);
});

export default axios;