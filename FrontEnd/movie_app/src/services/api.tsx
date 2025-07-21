import axios from 'axios';

const api = axios.create({
  
  baseURL:  process.env.NEXT_PUBLIC_API,
    withCredentials: true, 

});

export default api;