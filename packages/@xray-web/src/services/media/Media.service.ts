import FormData from 'form-data';
import {AxiosResponse} from 'axios';
import {backendAPI} from '../../api';
import {MediaService} from './Media.types';
import {Media} from '@xray/types';

export class MediaServiceImplementation implements MediaService {
  async getMediaForSession() {
    const mediaResponse: AxiosResponse<Media[]> = await backendAPI.get('media');
    return mediaResponse.data;
  }

  async getMediaByID(mediaID: number) {
    const mediaResponse: AxiosResponse<Media> = await backendAPI.get(
      `media/${mediaID}`
    );
    return mediaResponse.data;
  }

  async createMedia(mediaFile: File) {
    const formData = new FormData();
    formData.append('file', mediaFile);
    const mediaResponse: AxiosResponse<Media> = await backendAPI.post(
      'media',
      formData,
      {
        headers: {
          Accept: '*/*',
        },
      }
    );
    return mediaResponse.data;
  }
}
