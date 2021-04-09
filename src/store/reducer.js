/*
 * @Description: 
 * @Date: 2021-02-23 11:52:38
 * @LastEditTime: 2021-04-09 11:19:55
 */
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from 'application/Recommend/store';
import { reducer as singersReducer } from 'application/Singers/store';
import { reducer as rankReducer } from 'application/Rank/store';
import { reducer as albumReducer } from 'application/Album/store';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer
});