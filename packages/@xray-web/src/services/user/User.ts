import {UserTypes} from './';
import {AxiosResponse} from 'axios';
import {backendAPI} from '../../api';
import {User} from '@xray/types';

export class UserService implements UserTypes {
  async create(
    username: string,
    password: string,
    recaptcha: string
  ): Promise<User> {
    const user: AxiosResponse<User> = await backendAPI.post('users', {
      username,
      password,
      recaptcha,
    });
    return user.data;
  }

  async getByID(userID: number): Promise<User> {
    const user: AxiosResponse<User> = await backendAPI.get(`users/${userID}`);
    return user.data;
  }
}

export const userService: UserTypes = new UserService();
