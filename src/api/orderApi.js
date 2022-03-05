import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class OrderApi {
  feedback = (id, data) => {
    const url = MAIN_URL.concat(`/orders/${id}`);
    return axiosClient.put(url, data);
  };
  orderInfo = id => {
    const url = MAIN_URL.concat(`/orders/${id}`);
    return axiosClient.get(url);
  };
  deliveringOrders = () => {
    const url = MAIN_URL.concat(`/orders`);
    return axiosClient.get(url);
  };
  deliveredOrders = () => {
    const url = MAIN_URL.concat(`/orders/delivered`);
    return axiosClient.get(url);
  };
  tracing = id => {
    const url = MAIN_URL.concat(`/orders/tracing/${id}`);
    return axiosClient.get(url);
  };
}
const orderApi = new OrderApi();
export default orderApi;
