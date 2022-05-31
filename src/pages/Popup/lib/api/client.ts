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

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    switch (status) {
      case 401:
        const originalRequest = config;
        const tokens = getTokens();
        if (!tokens) throw new Error('No tokens found');
        const { accessToken, refreshToken } = tokens;
        try {
          const { data } = await axios.get(
            `${SERVER_URL}/api/v1/user/reIssuanceAccessToken`,
            {
              headers: {
                accessToken: `Bearer ${accessToken}`,
                refreshToken: `Bearer ${refreshToken}`,
              },
            },
          );

          const newTokens = {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
          localStorage.setItem('DOTORI_USER', JSON.stringify(newTokens));
          axios.defaults.headers.common.accessToken = `Bearer ${data.accessToken}`;
          axios.defaults.headers.common.refreshToken = `Bearer ${data.refreshToken}`;
          originalRequest.headers.accessToken = `Bearer ${data.accessToken}`;
          originalRequest.headers.refreshToken = `Bearer ${data.refreshToken}`;
          // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
          return axios(originalRequest);
        } catch (e) {
          localStorage.removeItem('DOTORI_USER');
          chrome.storage.local.clear();
          chrome.extension.getViews({ type: 'popup' })[0].location.reload();
        }
        break;

      default:
        throw new Error('Unknown Error');
    }
  },
);

export default client;
