import {MediaService} from './Media.types';
import {MediaServiceImplementation} from './Media.service';

export const mediaService: MediaService = new MediaServiceImplementation();
