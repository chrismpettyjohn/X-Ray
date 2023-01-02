import { GuestGuard, UserGuard } from "@xray/web";
import { GET_HOME_PAGE_LINK, GET_LOGIN_PAGE_LINK, GET_LOGOUT_PAGE_LINK, GET_REGISTER_PAGE_LINK, GET_PREFERENCES_PAGE_LINK} from '../../pages/links';

export const SITE_NAVIGATION_LINKS: Array<{ label: any, icon: string, href: string, guard?: any }> = [
  {
    label: 'Home',
    icon: 'fas fa-home',
    guard: undefined,
    href: GET_HOME_PAGE_LINK(),
  },
  {
    label: 'Sign In',
    icon: 'fas fa-sign-in',
    guard: GuestGuard,
    href: GET_LOGIN_PAGE_LINK(),
  },
  {
    label: 'Create Account',
    icon: 'fas fa-user-plus',
    guard: GuestGuard,
    href: GET_REGISTER_PAGE_LINK(),
  },
  {
    label: 'Preferences',
    icon: 'fas fa-wrench',
    guard: UserGuard,
    href: GET_PREFERENCES_PAGE_LINK(),
  },
  {
    label: 'Sign Out',
    icon: 'fas fa-sign-out',
    guard: UserGuard,
    href: GET_LOGOUT_PAGE_LINK(),
  },
]
