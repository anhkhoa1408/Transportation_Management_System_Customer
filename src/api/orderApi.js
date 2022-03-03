import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class OrderApi {
  feedback = (id, data) => {
    const url = MAIN_URL.concat(`/orders/${id}`);
    return axiosClient.put(url, data);
  };
}
const orderApi = new OrderApi();
export default orderApi;
