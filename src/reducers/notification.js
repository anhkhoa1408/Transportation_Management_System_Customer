import {
  ADD_NOTIFICATION,
  DEL_NOTIFICATION,
  CLEAN_NOTIFICATION,
} from '../constants/types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DEL_NOTIFICATION:
      const { [action.payload]: delState, ...newState } = state;
      return newState;
    case CLEAN_NOTIFICATION:
      return {};
    default:
      return state;
  }
};
export default reducer;
