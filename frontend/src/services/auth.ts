import {removeWindowClass} from '@app/utils/helpers';
import axios from 'axios';
import {Gatekeeper} from 'gatekeeper-client-sdk';

export const loginByAuth = async (email: string, password: string) => {
  const token = await Gatekeeper.loginByAuth(email, password);
  localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

export const registerByAuth = async (email: string, password: string) => {
  const token = await Gatekeeper.registerByAuth(email, password);
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};

export const loginData = (form) => {
  return axios({
    method: 'POST',
    headers: {},
    url: 'http://localhost:2023/api/v1/login',
    data: form
  });
};

export const registerData = (form) => {
  return axios({
    method: 'POST',
    headers: {},
    url: 'http://localhost:2023/api/v1/register',
    data: form
  });
};
