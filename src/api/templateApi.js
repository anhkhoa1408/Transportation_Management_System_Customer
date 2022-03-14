import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class TemplateApi {
  getOrders = params => {
    const url = MAIN_URL.concat('/order-templates');
    return axiosClient.get(url, { params });
  };

  getPackages = params => {
    const url = MAIN_URL.concat('/package-templates');
    return axiosClient.get(url, { params });
  };

  updateOrder = (id, data) => {
    const url = MAIN_URL.concat(`/order-templates/${id}`);
    return axiosClient.put(url, data);
  };

  updatePackage = (id, data) => {
    const url = MAIN_URL.concat(`/package-templates/${id}`);
    return axiosClient.put(url, data);
  };

  createOrder = data => {
    const url = MAIN_URL.concat(`/order-templates`);
    return axiosClient.post(url, data);
  };

  createPackage = data => {
    const url = MAIN_URL.concat(`/package-templates`);
    return axiosClient.post(url, data);
  };

  deleteOrder = data => {
    const url = MAIN_URL.concat(`/order-templates/delete`);
    return axiosClient.post(url, data);
  };

  deletePackage = data => {
    const url = MAIN_URL.concat(`/package-templates/delete`);
    return axiosClient.post(url, data);
  };
}
const templateApi = new TemplateApi();
export default templateApi;
