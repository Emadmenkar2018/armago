import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
let APIKit = axios.create({
    baseURL: 'http://ec2-3-8-232-76.eu-west-2.compute.amazonaws.com/',
    timeout: 10000,
  });

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
    AsyncStorage.setItem('userToken', token);
    APIKit.interceptors.request.use(function(config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
};

// Intercept all request
APIKit.interceptors.request.use(
  config => {
    
    return config;
    },error => Promise.reject(error),
  );
// Intercept all responses
APIKit.interceptors.response.use(
  async response => {
    
    return response;
  },
  error => {
    
    if(error.response.status !== 401){
      return Promise.reject(error);
    }
    console.log('interceptor : ' + error.response.status);
    if(error.response.status == 401){ //refresh token with old one
      const old_token = AsyncStorage.getItem('userToken');
      console.log(old_token)
      // send login screen for now.
      
    }
  },
);

//set smscode 'api/sendsmscode', /api/verifycode
APIKit.sendSMSCode = payload => APIKit.post('api/sendsmscode', payload);
APIKit.verifyCode = payload => APIKit.post('api/verifycode', payload);

// register with phone and email
APIKit.register = payload => APIKit.post('api/register',payload);
APIKit.login = payload => APIKit.post('api/login',payload);
APIKit.profile = payload => APIKit.patch('api/profile', payload);
APIKit.getprofile = () => APIKit.get('api/profile');
APIKit.getsports = () => APIKit.get('api/sports/all');
APIKit.getsportsprofile = () => APIKit.get('api/profile/sports');
APIKit.setsports = payload => APIKit.patch('api/profile/sports', payload);
APIKit.getability = () => APIKit.get('api/profile/ability');
APIKit.setability = payload => APIKit.patch('api/profile/ability', payload);
export default APIKit;