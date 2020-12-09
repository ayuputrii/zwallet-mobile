import {combineReducers} from 'redux';
import loginReducer from './Login';
import registerReducer from './Register';
import userReducer from './Users';
import historyReducer from './History';
import searchReducer from './Search';
import transferReducer from './Transfer';
import topupReducer from './Topup';

export default combineReducers({
  auth: loginReducer,
  register: registerReducer,
  user: userReducer,
  history: historyReducer,
  search: searchReducer,
  transfer: transferReducer,
  topup: topupReducer,
});
