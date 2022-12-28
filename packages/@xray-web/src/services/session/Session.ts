import {AxiosResponse} from 'axios';
import {backendAPI} from '../../api';
import {SessionService} from './Session.types';
import {UpdateUserDTO, User} from '@xray/types';

class SessionServiceImplementation implements SessionService {
  async init(): Promise<User | undefined> {
    try {
      return await this.getCurrentUser();
    } catch {
      return undefined;
    }
  }

  async attemptCredentials(
    username: string,
    password: string,
    recaptcha: string
  ): Promise<User> {
    const session: AxiosResponse<User> = await backendAPI.post('session', {
      username,
      password,
      recaptcha,
    });
    return session.data;
  }

  async getCurrentUser(): Promise<User> {
    const session: AxiosResponse<User> = await backendAPI.get('session');
    return session.data;
  }

  async updatePreferences(updateUserDTO: UpdateUserDTO): Promise<void> {
    await backendAPI.patch('session/preferences', updateUserDTO);
  }

  async logout(): Promise<void> {
    await backendAPI.post('session/logout');
  }
}

export const sessionService: SessionService =
  new SessionServiceImplementation();
