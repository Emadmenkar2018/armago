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

//set smscode 'api/sendsmscode', /api/verifycode
APIKit.sendSMSCode = payload => APIKit.post('api/sendsmscode', payload);
APIKit.verifyCode = payload => APIKit.post('api/verifycode', payload);

// register with phone and email
APIKit.register = payload => APIKit.post('api/register',payload);
APIKit.login = payload => APIKit.post('api/login',payload);
export default APIKit;