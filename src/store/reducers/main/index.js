import {combineReducers} from 'redux';
import data from './data.reducer';

const mainReducers = combineReducers({
  data,
});

export default mainReducers;
