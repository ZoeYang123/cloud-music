/*
 * @Description: 
 * @Date: 2021-02-23 11:52:38
 * @LastEditTime: 2021-02-24 11:43:48
 */
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from 'application/Recommend/store';
import { reducer as singersReducer } from 'application/Singers/store';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer
});