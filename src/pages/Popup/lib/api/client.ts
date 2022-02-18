import axios from 'axios';
import { SERVER_URL } from '../constants';
import getTokens from '../getTokens';

const client = axios.create({
  withCredentials: true,
});

client.defaults.baseURL = SERVER_URL;

client.interceptors.request.use(
  (config) => {
    if (!config?.headers) {
      throw new Error('No headers');
    }

    const tokens = getTokens();
    if (!tokens) throw new Error('No tokens found');

    const { accessToken, refreshToken } = tokens;
    config.headers.accessToken = `Bearer ${accessToken}`;
    config.headers.refreshToken = `Bearer ${refreshToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default client;
