import React from 'react';
import {Link, useLocation} from 'wouter';
import {SidebarMenuLinkProps} from './SidebarMenuLink.types';
import {MenuItem, ListItemIcon, ListItemText} from '@mui/material';

export function SidebarMenuLink({href, icon, children}: SidebarMenuLinkProps) {
  const [location] = useLocation();
  const isActive =
    location.indexOf(':') > -1
      ? href.indexOf(location) > -1
      : location === href;
  return (
    <Link to={href}>
      <MenuItem sx={{mb: 4}} selected={isActive}>
        <ListItemIcon
          sx={{
            background: '#1B1B22',
            padding: '8px',
            borderRadius: '100%',
            textAlign: 'center',
            mr: 4,
          }}
        >
          <i className={icon} style={{color: 'white'}} />
        </ListItemIcon>
        <ListItemText>{children}</ListItemText>
      </MenuItem>
    </Link>
  );
}
