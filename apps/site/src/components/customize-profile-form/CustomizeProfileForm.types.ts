import {User} from '@xray/types';

export interface CustomizeProfileFormProps {
  defaultUser: User;
  onChanges(): void;
}
