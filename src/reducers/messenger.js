import { ADD_MESSAGE, SAVE_MESSAGES } from '../constants/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const room = state[action.room] === undefined ? [] : state[action.room];
      return {
        ...state,
        [action.room]: [action.payload, ...room],
      };
    case SAVE_MESSAGES:
      return {
        ...state,
        [action.room]: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
