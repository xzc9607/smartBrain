import {createStore} from 'redux';
import rootReducer from './reducers';
const configureStore = preloadedState => {
  return createStore(rootReducer);
};

const store = configureStore();
export default store;
