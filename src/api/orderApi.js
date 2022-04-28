import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class OrderApi {
  getList = params => {
    const url = MAIN_URL.concat(`/orders`);
    return axiosClient.get(url, { params });
  };
  feedback = (id, data) => {
    const url = MAIN_URL.concat(`/orders/${id}`);
    return axiosClient.put(url, data);
  };
  update = (id, data) => {
    const url = MAIN_URL.concat(`/orders/${id}`);
    return axiosClient.put(url, data);
  };
  orderInfo = id => {
    const url = MAIN_URL.concat(`/orders/${id}`);
    return axiosClient.get(url);
  };
  deliveringOrders = () => {
    const url = MAIN_URL.concat(`/orders/delivering`);
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
  newOrder = data => {
    const url = MAIN_URL.concat(`/orders`);
    return axiosClient.post(url, data);
  };
  payment = data => {
    const url = 'https://test-payment.momo.vn/v2/gateway/api/create';
    return axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
  };
  getFee = data => {
    const url = MAIN_URL.concat(`/fees`);
    return axiosClient.post(url, data);
  }
}
const orderApi = new OrderApi();
export default orderApi;
