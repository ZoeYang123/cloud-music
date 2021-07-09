/*
 * @Description: 
 * @Date: 2021-02-23 11:52:38
 * @LastEditTime: 2021-07-06 15:48:59
 */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)));

export default store;