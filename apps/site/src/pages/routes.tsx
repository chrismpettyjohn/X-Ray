import React from 'react';
import { setURL } from "@xray/web";
import { HomePage } from './home-page/HomePage';
import { LoginPage } from './login-page/LoginPage';
import { LogoutPage } from './logout-page/LogoutPage';
import { LandingPage } from './landing-page/LandingPage';
import { RegisterPage } from './register-page/RegisterPage';
import { PreferencesPage } from './preferences-page/PreferencesPage';
import {GET_LANDING_PAGE_LINK, GET_HOME_PAGE_LINK, GET_LOGIN_PAGE_LINK, GET_LOGOUT_PAGE_LINK, GET_REGISTER_PAGE_LINK, GET_PREFERENCES_PAGE_LINK} from './links';

setURL(GET_LANDING_PAGE_LINK(), <LandingPage />);
setURL(GET_LOGIN_PAGE_LINK(), <LoginPage />);
setURL(GET_HOME_PAGE_LINK(), <HomePage />);
setURL(GET_LOGOUT_PAGE_LINK(), <LogoutPage />);
setURL(GET_REGISTER_PAGE_LINK(), <RegisterPage />);
setURL(GET_PREFERENCES_PAGE_LINK(), <PreferencesPage />);
