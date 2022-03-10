import { Linking } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import hex from 'crypto-js/enc-hex';
import { MAIN_URL } from './../api/config';
import orderApi from '../api/orderApi';

const ACCESS_KEY = '1pYXJzme1RPUuDxg';
const IPN_URL = MAIN_URL.concat('/payments/momo-notification');
const LANG = 'vi';
const ORDER_INFO = 'Thanh toán hoá đơn vận chuyển';
const PARTNER_CODE = 'MOMOFBEH20220309';
const PARTNER_NAME = 'Shober Delivery';
const REQUEST_ID = uuidv4();
const REQUEST_TYPE = 'captureWallet';
const REDIRECT_URL = 'shober-delivery://shober/home';
const STORE_ID = 'ABCD12345678';
const PUB_KEY = 'sTBbxkWvKii2LdRnOJQVSWszGvZaNpIE';

export async function handleRequestPayment(amount = 5000, orderId) {
  let rawSign = `accessKey=${ACCESS_KEY}&amount=${amount}&extraData=&ipnUrl=${IPN_URL}&orderId=${orderId}&orderInfo=${ORDER_INFO}&partnerCode=${PARTNER_CODE}&redirectUrl=${REDIRECT_URL}&requestId=${REQUEST_ID}&requestType=${REQUEST_TYPE}`;
  let bytes = hmacSHA256(rawSign, PUB_KEY);
  let encrypted = bytes.toString(hex);

  try {
    let data = {
      partnerCode: PARTNER_CODE,
      partnerName: PARTNER_NAME,
      storeId: STORE_ID,
      requestId: REQUEST_ID,
      amount: amount,
      orderId: orderId,
      orderInfo: ORDER_INFO,
      redirectUrl: REDIRECT_URL,
      ipnUrl: IPN_URL,
      requestType: REQUEST_TYPE,
      extraData: '',
      lang: LANG,
      signature: encrypted,
    };
    let response = await orderApi.payment(data);
    if (response && response.resultCode === 0) {
      Linking.openURL(response.payUrl);
    } else {
      Linking.openURL('shober-delivery://shober/home');
    }
    console.log(JSON.stringify(response));
  } catch (error) {
    Linking.openURL('shober-delivery://shober/home');
    console.log(JSON.stringify(error));
  }
}