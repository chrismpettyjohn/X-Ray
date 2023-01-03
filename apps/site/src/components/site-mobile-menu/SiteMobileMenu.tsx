import React from 'react';
import {useLocation} from 'wouter';
import {BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';
import {SITE_NAVIGATION_LINKS} from '../site-navigation/SiteNavigation.const';

export function SiteMobileMenu() {
  const [, setLocation] = useLocation();

  return (
    <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
      <BottomNavigation>
        {SITE_NAVIGATION_LINKS.map((_, key) => {
          const navLink: any = (
            <BottomNavigationAction
              key={`mobile_menu_${_.href}_${key}`}
              icon={<i className={_.icon} />}
              sx={{cursor: 'pointer'}}
              onClick={() => setLocation(_.href)}
            />
          );

          if (_.guard) {
            const NavGuard: any = _.guard;
            return (
              <NavGuard key={`mobile_menu_guard_${_.href}_${key}`} redirect={false}>
                <>{navLink}</>
              </NavGuard>
            );
          }

          return <>{navLink}</>;
        })}
      </BottomNavigation>
    </Paper>
  );
}
