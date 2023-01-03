import Axios, {AxiosInstance} from 'axios';

export const backendAPI: AxiosInstance = Axios.create({
  baseURL: '/api',
  withCredentials: true,
});
