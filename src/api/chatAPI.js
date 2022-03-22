import axiosClient from './axiosClient';
import { MAIN_URL } from './config';

class ChatAPI {
  getRooms = () => {
    const url = MAIN_URL.concat('/room-chats/user/rooms');
    return axiosClient.get(url);
  };
  getMessageByRoom = room => {
    const url = MAIN_URL.concat('/messages/room/' + room);
    return axiosClient.get(url);
  };
}
const chatAPI = new ChatAPI();
export default chatAPI;
