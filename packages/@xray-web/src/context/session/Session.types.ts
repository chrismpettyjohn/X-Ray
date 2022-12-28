import {User} from '@xray/types';

export interface SessionContext {
  user?: User;
  setUser: (user?: Partial<User>) => void;
}

export const defaultSessionContext: SessionContext = {
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (user?: Partial<User>) => {},
};
