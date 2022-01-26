import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class AuthorApi {
  login = data => {
    const url = MAIN_URL.concat('/auth/local');
    return axiosClient.post(url, data);
  };
  register = data => {
    const url = MAIN_URL.concat('/auth/signup');
    return axiosClient.post(url, data);
  };
  update = (id, data) => {
    const url = MAIN_URL.concat(`/users/${id}`);
    return axiosClient.put(url, data);
  };
}
const authApi = new AuthorApi();
export default authApi;
