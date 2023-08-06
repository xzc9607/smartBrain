import {RESETUSERDATA} from './actionTypes';
import {RESETADDLIST} from './actionTypes';

const defaultState = {
  userdata: {},
  addList: [],
};

function globle(state = defaultState, action) {
  switch (action.type) {
    case RESETUSERDATA:
      return {...state, userdata: action.data};
    case RESETADDLIST:
      return {...state, addList: action.data};
    default:
      return state;
  }
}

export default globle;
