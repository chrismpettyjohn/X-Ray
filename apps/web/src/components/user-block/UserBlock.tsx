import React from 'react';
import { UserBlockProps } from "./UserBlock.types";
import { Avatar, Paper, Typography } from "@mui/material";

export function UserBlock({ user }: UserBlockProps) {
  return (
    <Paper elevation={4} sx={{display: 'flex', padding: 2,width: '100%'}}>
      <div style={{marginRight: '4%'}}>
        <Avatar src={user.profilePicture?.url} sx={{height: 75, width: 75}} />
      </div>
      <div>
        <Typography variant="subtitle2" sx={{fontWeight: 'bold'}}>
          @{user.username}
        </Typography>
        <div>
      </div>
      </div>
    </Paper>
  )
}
