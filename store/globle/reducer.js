import {RESETUSERDATA} from './actionTypes';

const defaultState = {
  userdata: {},
};

function globle(state = defaultState, action) {
  switch (action.type) {
    case RESETUSERDATA:
      return {...state, userdata: action.data};
    default:
      return state;
  }
}

export default globle;
