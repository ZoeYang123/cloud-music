/*
 * @Description: 
 * @Date: 2021-05-07 14:11:24
 * @LastEditTime: 2021-05-26 16:12:49
 */

import { memo, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  changePlayingState,
  changeShowPlayList,
  changeCurrentIndex,
  changeCurrentSong,
  changePlayList,
  changePlayMode,
  changeFullScreen
} from './store/actionCreators';

import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';

function Player(props) {
  const currentSong = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }
  const { fullScreen } = props;
  const { toggleFullScreenDispatch } = props;

  return (
    <div>
      <MiniPlayer 
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
      />
      <NormalPlayer
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
      />
    </div>
  )
}

const mapStateToProps = state =>({
  fullScreen:state.getIn(['player','fullScreen']),
  playing: state.getIn(['player','playing']),
  currentSong: state.getIn(['player','showPlayList']),
  showPlayList: state.getIn(['player','showPlayList']),
  mode: state.getIn(['player','mode']),
  currentIndex: state.getIn(['player','currentIndex']),
  playList:state.getIn(['player','playList']),
  sequencePlayList: state.getIn(['player','sequencePlayList'])
});

const mapDispatchToProps = dispatch =>{
  return{
    togglePlayingDispatch(data){
      dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data){
      dispatch(changeFullScreen(data))
    },
    togglePlayListDispatch(data){
      dispatch(changeShowPlayList(data))
    },
    changeCurrentIndexDispatch(index){
      dispatch(changeCurrentIndex(index))
    },
    changeCurrentDispatch(data){
      dispatch(changeCurrentSong(data))
    },
    changeModeDispatch(data){
      dispatch(changePlayMode(data))
    },
    changePlayListDispatch(data){
      dispatch(changePlayList(data))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(memo(Player));