import {Media} from '@xray/types';
import {mediaService} from '../../services/media';
import {createFetchHook} from '../fetch-hook.base';

export const useFetchMediaForSession = (refresh = 0) =>
  createFetchHook<Media[]>(() => mediaService.getMediaForSession(), refresh);
