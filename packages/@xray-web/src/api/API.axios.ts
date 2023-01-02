import Axios, {AxiosInstance} from 'axios';
import {setupCache} from 'axios-cache-adapter';
import {API_BASE_URL} from '../environment';

const cache = setupCache({
  maxAge: 0,
});

export const backendAPI: AxiosInstance = Axios.create({
  adapter: cache.adapter,
  baseURL: API_BASE_URL,
  withCredentials: true,
});
