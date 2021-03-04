/*
 * @Description: 
 * @Date: 2021-02-23 11:52:38
 * @LastEditTime: 2021-03-04 18:16:23
 */
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from 'application/Recommend/store';
import { reducer as singersReducer } from 'application/Singers/store';
import { reducer as rankReducer } from 'application/Rank/store';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer
});