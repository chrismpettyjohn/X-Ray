import {Media} from '@xray/types';
import {mediaService} from '../../services/media';
import {createFetchHook} from '../fetch-hook.base';

export const useFetchMediaByID = (mediaID: number, refresh = 0) =>
  createFetchHook<Media>(() => mediaService.getMediaByID(mediaID), refresh);
