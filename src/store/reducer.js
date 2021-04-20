/*
 * @Description: 
 * @Date: 2021-02-23 11:52:38
 * @LastEditTime: 2021-04-20 16:00:32
 */
import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from 'application/Recommend/store';
import { reducer as singersReducer } from 'application/Singers/store';
import { reducer as rankReducer } from 'application/Rank/store';
import { reducer as albumReducer } from 'application/Album/store';
import {reducer as singerInfoReducer } from 'application/Singer/store';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo:singerInfoReducer
});