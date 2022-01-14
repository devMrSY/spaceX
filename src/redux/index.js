import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../redux/Reducer/index';

const store = applyMiddleware(thunk)(createStore)(reducers);

export default store;
