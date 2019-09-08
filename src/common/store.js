import { createStore, combineReducers } from 'redux';
import userInfo from '../reducer/userInfo/state';
import bodyStatus from '../reducer/bodyStatus/state';
import meal from '../reducer/meal/state';

const combineReducer = combineReducers({
  user: userInfo,
  meal,
});

const store = createStore(combineReducer);
export default store;
