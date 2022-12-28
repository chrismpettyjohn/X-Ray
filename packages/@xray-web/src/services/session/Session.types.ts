import {UpdateUserDTO, User} from '@xray/types';

export interface SessionService {
  // Fetches user bearer token if it exists
  // Attempts to fetch user with the bearer token
  // Upon failure will logout and return undefined
  init(): Promise<User | undefined>;

  // Adds a bearer token to cookies upon success
  // Throws exception upon failure
  attemptCredentials(
    username: string,
    password: string,
    recaptcha: string
  ): Promise<User>;

  getCurrentUser(): Promise<User>;

  updatePreferences(updateUserDTO: UpdateUserDTO): Promise<void>;

  // Removes the user's bearer token from cookies
  logout(): void;
}
