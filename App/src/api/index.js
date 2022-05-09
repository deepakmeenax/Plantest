import axios from 'axios';

const API = axios.create({ baseURL: 'https://bbd-server.herokuapp.com' });

// API.interceptors.request.use(async function (config) {
//   const obj = await AsyncStorage.getItem('persist:root');
//   const token = JSON.parse(JSON.parse(obj).auth).authtoken;

//   config.headers.authorization = token ? `Bearer ${token}` : null;
//   return config;
// });

export const getcode = number => API.post('/getcode', { number });

export const verifycode = ({ number, code }) =>
  API.post('/verifycode', { number, code });

export const singup = ({ number, name, isverify }) =>
  API.post('/singup', { number, name, isverify });

export const fetchBank = ({ lat, lng }) =>
  API.get(`/search/bloodbank/within/${lat}/${lng}`);

export const fetchCamp = ({ lat, lng }) =>
  API.get(`/search/camp/${lat}/${lng}`);

export const fetchOneCamp = ({ id }) => API.get(`/search/camp/detail/${id}`);

export const addparticipant = ({ id }) => API.get(`/reg/in/camp/${id}`);
