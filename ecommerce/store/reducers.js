import { combineReducers } from 'redux';

import cart from './cart/cartSlice';

const reducers = combineReducers({
  cart,
});

export default reducers;
