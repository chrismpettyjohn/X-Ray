import Axios, {AxiosInstance} from 'axios';
import {setupCache} from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 0,
});

export const backendAPI: AxiosInstance = Axios.create({
  adapter: cache.adapter,
  baseURL: process.env.REACT_APP_API ?? '/api',
  withCredentials: true,
});
