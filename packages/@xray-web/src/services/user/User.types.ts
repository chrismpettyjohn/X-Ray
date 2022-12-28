import {User} from '@xray/types';

export interface UserTypes {
  create(username: string, password: string, recaptcha: string): Promise<User>;

  getByID(userID: number): Promise<User>;
}
