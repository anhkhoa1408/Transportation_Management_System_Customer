import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class AuthorApi {
  login = data => {
    const url = MAIN_URL.concat('/auth/local');
    return axiosClient.post(url, data);
  };
  loginWithProvider = (provider, token) => {
    let url;
    if (provider === 'phone') {
      url = MAIN_URL.concat(`/auth/phone?code=${token}&create=true`);
    } else url = MAIN_URL.concat(`/auth/${provider}/callback?code=${token}`);
    return axiosClient.get(url);
  };
  register = data => {
    const url = MAIN_URL.concat('/auth/local/register');
    return axiosClient.post(url, data);
  };
  update = (id, data) => {
    const url = MAIN_URL.concat(`/users/${id}`);
    return axiosClient.put(url, data);
  };
  updateDeviceToken = async token => {
    const url = MAIN_URL.concat(`/users/device_token`);
    return axiosClient.put(url, { device_token: token });
  };
}
const authApi = new AuthorApi();
export default authApi;
