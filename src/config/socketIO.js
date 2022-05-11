import io from 'socket.io-client';
import { MAIN_URL } from '../api/config';
import {
  addMessage,
  addCustomer,
  saveMessages,
  saveCustomers,
} from '../actions/actions';
import chatAPI from '../api/chatAPI';
import { store } from './configureStore';

// Initialize Socket IO:
export const socket = io(MAIN_URL);

// export the function to connect and use socket IO:
export const startSocketIO = () => {
  socket.connect();

  socket.on('connect', () => {
    console.log('Connect socket ', socket.id);
    initChat();
  });

  socket.on('disconnect', () => {
    console.log('Disconnect socket');
  });

  socket.on('room', (room, customer) => {
    store.dispatch(addCustomer(customer, room));
    socket.emit('join', room);
  });

  socket.on('chat', (message, room) => {
    store.dispatch(addMessage(message, room));
  });
};

export function initChat() {
  if (store.getState().userInfo.user) {
    chatAPI
      .getRooms()
      .then(rooms => {
        store.dispatch(saveCustomers(rooms));
        socket.emit(
          'join',
          rooms.map(item => item.room),
        );
        rooms.forEach(room => {
          chatAPI
            .getMessageByRoom(room.room)
            .then(messages => store.dispatch(saveMessages(messages, room.room)))
            .catch(err => console.log(err, 'Chat update fail'));
        });
      })
      .catch(err => console.log(err, 'Room update fail'));
  }
}
