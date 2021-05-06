/*
 * @Description: 
 * @Date: 2021-05-06 17:47:57
 * @LastEditTime: 2021-05-06 18:21:52
 */

 import * as actionTypes from './constants';
 import { fromJS } from 'immutable';
 import { playMode } from 'api/config';

 const defaultState = fromJS({
   fullScreen:false,
   playing: false,
   sequencePlayList:[],
   playList:[],
   mode:playMode.sequence,
   currentIndex:-1,
   showPlayList:false,
   currentSong:{}
 });

 ex