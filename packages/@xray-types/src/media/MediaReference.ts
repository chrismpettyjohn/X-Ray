import {exampleMedia, Media} from './Media';

export interface MediaReference {
  id: number;
  media: Media;
  feature: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export const exampleMediaReference: MediaReference = {
  id: 1,
  media: exampleMedia,
  feature: 'news',
  description: 'article header',
  createdAt: '',
  updatedAt: '',
};
