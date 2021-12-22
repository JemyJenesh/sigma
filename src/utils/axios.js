import Axios from 'axios';
import Config from 'react-native-config';
import RNRestart from 'react-native-restart';
import {removeToken} from './tokenHelper';

const axios = Axios.create({
  baseURL: Config.SERVER_URL,
});

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (401 === err.response.status) {
      removeToken();
      RNRestart.Restart();
    } else {
      return Promise.reject(err);
    }
  },
);

export {axios, setAuthToken};
