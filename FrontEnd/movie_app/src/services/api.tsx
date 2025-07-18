import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.18:8081',
    withCredentials: true, 

});

export default api;