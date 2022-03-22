import { ADD_CUSTOMER, SAVE_CUSTOMERS } from '../constants/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {
        ...state,
        [action.room]: action.payload,
      };
    case SAVE_CUSTOMERS:
      let newState = { ...state };
      action.payload.forEach(data => {
        const { room, ...customer } = data;
        newState[room] = customer;
      });
      return newState;
    default:
      return state;
  }
};
export default reducer;
