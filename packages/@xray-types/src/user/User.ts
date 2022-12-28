import {Media} from '../media';
import {PermissionGroup} from '../permission-group/PermissionGroup';

export interface User {
  id: number;
  username: string;
  rank?: Omit<PermissionGroup, 'users'>;
  profilePicture?: Media;
}
