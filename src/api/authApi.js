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
  updateAvatar = async avatar => {
    const url = MAIN_URL.concat('/users/avatar');

    let formData = new FormData();
    formData.append('avatar', {
      uri: avatar.uri,
      name: avatar.fileName,
      type: avatar.type,
    });
    return axiosClient.put(url, formData);
  };
  updateDeviceToken = async token => {
    const url = MAIN_URL.concat(`/users/device_token`);
    return axiosClient.put(url, { device_token: token });
  };
  getPointLevel = () => {
    const url = MAIN_URL.concat(`/config/point`);
    return axiosClient.get(url);
  }
}
const authApi = new AuthorApi();
export default authApi;
