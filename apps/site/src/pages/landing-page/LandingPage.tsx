import {Redirect} from 'wouter';
import React, {useContext} from 'react';
import {sessionContext} from '@xray/web';
import {GET_HOME_PAGE_LINK, GET_LOGIN_PAGE_LINK} from '../links';

export function LandingPage() {
  const {user} = useContext(sessionContext);
  return <Redirect to={user ? GET_HOME_PAGE_LINK() : GET_LOGIN_PAGE_LINK()} />;
}
