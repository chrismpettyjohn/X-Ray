import { toast } from "react-toastify";
import React, { useState } from "react";
import { Avatar, Grid } from "@mui/material";
import { mediaService } from "@xray/web";
import { Dropzone } from "../../../components/dropzone/Dropzone";
import { ProfilePictureEditorProps } from "./ProfilePictureEditor.types";

export function ProfilePictureEditor({ defaultProfilePicture, onChangeProfilePicture }: ProfilePictureEditorProps) {
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [isLoading, setIsLoading] = useState(false);

  async function onUploadImage(file: File) {
    try {
      setIsLoading(true);
      const newImageMedia = await mediaService.createMedia(file);
      setProfilePicture(newImageMedia);
      onChangeProfilePicture(newImageMedia);
      toast.success('Successfully uploaded new image');
    } catch (e: any) {
      toast.error('Failed to upload image')
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Grid container spacing={4} sx={{mb: 4}}>
      <Grid item>
        <Dropzone files={[]} onChange={newFiles => onUploadImage(newFiles[0])} acceptedType="image" height={100} width={100} style={{borderRadius: '100%'}}>
          <div style={{textAlign: 'center', fontSize: '2rem'}}>
            <i className={isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-file-upload'} style={{marginBottom: 4}} />
          </div>
        </Dropzone>
      </Grid>
      <Grid item>
        <Avatar src={profilePicture?.url} style={{height: 100, width: 100}}/>
      </Grid>
    </Grid>
  )
}
