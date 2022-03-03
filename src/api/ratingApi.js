import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class ratingApi {
  ratingapi = (id, data) => {
    const url = MAIN_URL.concat(`/orders/${id}`);
    return axiosClient.put(url, data);
  };
}
const ratingapi = new ratingApi();
export default ratingapi;
