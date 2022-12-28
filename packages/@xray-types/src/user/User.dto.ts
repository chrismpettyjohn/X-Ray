export interface CreateUserDTO {
  username: string;
  password: string;
  recaptcha: string;
}

export interface UpdateUserDTO
  extends Partial<Omit<CreateUserDTO, 'recaptcha' | 'password'>> {
  existingPassword?: string; // Required for password changes
  newPassword?: string;
  profilePictureMediaID?: number;
}
