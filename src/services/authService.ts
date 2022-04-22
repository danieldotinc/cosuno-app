import jwtDecode from 'jwt-decode';
import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/auth';
const tokenKey = 'token';

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

const login = async (email: string, password: string) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
};

const loginWithJwt = (jwt: string) => {
  localStorage.setItem(tokenKey, jwt);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
};

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt || '') as User;
  } catch (ex) {
    return null;
  }
};

http.setJwt(getJwt() || '');

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
