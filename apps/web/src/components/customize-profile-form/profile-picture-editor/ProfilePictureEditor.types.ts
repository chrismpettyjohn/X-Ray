import { Media } from "@xray/types";

export interface ProfilePictureEditorProps {
  defaultProfilePicture?: Media;
  onChangeProfilePicture(newProfilePicture: Media): void;
}
