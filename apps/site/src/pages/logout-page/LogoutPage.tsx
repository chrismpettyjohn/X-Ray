import {useLocation} from 'wouter';
import {toast} from 'react-toastify';
import {useContext, useEffect} from 'react';
import {sessionContext, sessionService} from '@xray/web';
import { GET_HOME_PAGE_LINK, GET_LOGIN_PAGE_LINK } from '../links';

export function LogoutPage() {
  const [, setLocation] = useLocation();
  const {setUser} = useContext(sessionContext);

  useEffect(() => {
    async function logout() {
      try {
        await sessionService.logout();
        setUser(undefined);
        setLocation(GET_LOGIN_PAGE_LINK());
        toast.success('You have successfully signed out');
      } catch (e: any) {
        toast.error('There was a problem signing out');
        setLocation(GET_HOME_PAGE_LINK());
        throw e;
      }
    }
    logout();
  }, []);

  return null;
}
