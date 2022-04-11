import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class VoucherApi {
  getList = params => {
    const url = MAIN_URL.concat('/vouchers');
    return axiosClient.get(url, { params });
  };
}
const voucherApi = new VoucherApi();
export default voucherApi;
