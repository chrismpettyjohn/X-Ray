import {User} from '@xray/types';
import {createFetchHook} from '../fetch-hook.base';
import {sessionService} from '../../services/session';

export function useFetchCurrentUser(refresh = 0): User | undefined {
  return createFetchHook(() => sessionService.getCurrentUser(), refresh);
}
