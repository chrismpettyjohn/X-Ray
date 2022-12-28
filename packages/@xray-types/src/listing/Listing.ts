import {User} from '../user';
import {Media} from '../media';

export interface Listing {
  id: number;
  user: User;
  title: string;
  price: string;
  thumbnail: Media;
  images: Media[];
  content: string;
  createdAt: string;
  updatedAt: string;
}
