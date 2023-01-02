import {ReactNode} from 'react';

export interface DropzoneProps {
  files: File[];
  onChange(files: File[]): void;
  acceptedType: string;
  children: ReactNode;
  height: number | string;
  width: number | string;
  style?: object;
}
