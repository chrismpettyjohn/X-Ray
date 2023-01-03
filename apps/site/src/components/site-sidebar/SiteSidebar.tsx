import React from 'react';
import {SiteLogo} from '../site-logo/SiteLogo';
import {Box, MenuList, styled} from '@mui/material';
import {SidebarMenuLink} from './sidebar-menu-link/SidebarMenuLink';
import {SITE_NAVIGATION_LINKS} from '../site-navigation/SiteNavigation.const';

const Sidebar = styled('div')({
  boxShadow:
    '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
  flexGrow: 1,
  padding: 4,
  minHeight: '100%',
  width: '100%',
});

export function SiteSidebar() {
  return (
    <Sidebar>
      <Box
        sx={{background: '#0F58AD', display: 'flex', justifyContent: 'center'}}
      >
        <SiteLogo />
      </Box>
      <MenuList>
        {SITE_NAVIGATION_LINKS.map((_, key) => {
          const navLink: any = (
            <SidebarMenuLink
              key={`sidebar_menu_${key}`}
              href={_.href}
              icon={_.icon}
            >
              {_.label}
            </SidebarMenuLink>
          );

          if (_.guard) {
            const NavGuard: any = _.guard;
            return (
              <NavGuard key={`sidebar_menu_guard_${key}`} redirect={false}>
                <>{navLink}</>
              </NavGuard>
            );
          }

          return <>{navLink}</>;
        })}
      </MenuList>
    </Sidebar>
  );
}
