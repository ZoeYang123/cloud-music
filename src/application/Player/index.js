/*
 * @Description: 
 * @Date: 2021-05-07 14:11:24
 * @LastEditTime: 2021-07-09 17:32:57
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
import { getSongUrl, isEmptyObject, shuffle, findIndex } from 'api/utils';
import { playMode } from 'api/config'
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import Toast from 'baseUI/toast/index';

function Player(props) {
  // const currentSong = {
  //   al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
  //   name: "木偶人",
  //   ar: [{name: "薛之谦"}]
  // }
  const { 
    fullScreen, 
    playing, 
    currentIndex, 
    currentSong: immutableCurrentSong, 
    playList: immutablePlayList,
    mode, //播放状态
    sequencePlayList: immutableSequencePlayList, //顺序列表
  } = props;
  const { 
    toggleFullScreenDispatch, 
    togglePlayingDispatch, 
    changeCurrentIndexDispatch, 
    changeCurrentDispatch,
    changeModeDispatch, //改变吗mode
    changePlayListDispatch,//改变playList
   } = props;

  //目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  //歌曲总时长
  const [duration, setDuration] = useState(0);
  //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState({});
  const [modeText, setModeText] = useState("");

  //歌曲播放进度
  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const audioRef = useRef();
  const toastRef = useRef();

  const playList =immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();
  const currentSong = immutableCurrentSong.toJS();

  //先mock一份currentIndex
  useEffect(() => {
    changeCurrentIndexDispatch(0);
  }, []);

  useEffect(() => {
    if (!playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id
    ) return;

    let current = playList[currentIndex];
    changeCurrentDispatch(current);//赋值currentSong
    setPreSong(current);
    audioRef.current.src = getSongUrl(current.id);
    setTimeout(() => {
      audioRef.current.play();
    });
    togglePlayingDispatch(true);//播放时状态
    setCurrentTime(0);//从头开始播放
    setDuration((current.dt / 1000) | 0);//时长
  }, [playList, currentIndex]);

  useEffect(() => {
    playing ? audioRef.current.play() : audioRef.current.pause();
  }, [playing]);

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    toggleFullScreenDispatch(state)
  }

  const updateTime = e => {
    setCurrentTime(e.target.currentTime);
  }

  const onProgressChange = curPercent => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playing) {
      togglePlayingDispatch(true);
    }
  }

  //一首歌循环
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    changePlayingState(true);
    audioRef.current.play();
  }

  const handlePrev = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentDispatch(index);
  }

  const handleNext = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playing) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  }

  const changeMode = () =>{
    let newMode = (mode + 1) % 3;
    if(newMode === 0){
      //顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText('顺序播放');
    }else if(newMode === 1){
      //单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText('单曲循环');
    }else if(newMode === 2){
      //随机播放
      let newList = shuffle(sequencePlayList);
      let index = findIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText('随机播放');
    }
    changeModeDispatch(newMode);
    toastRef.current.show();
  }

  const handleEnd = () =>{
    if(mode === playMode.loop){
      handleLoop();
    }else{
      handleNext();
    }
  }

  return (
    <div>
      {
        isEmptyObject(currentSong) ? null :
          <MiniPlayer
            song={currentSong}
            fullScreen={fullScreen}
            toggleFullScreen={toggleFullScreenDispatch}
            clickPlaying={clickPlaying}
            percent={percent}
          />
      }
      {
        isEmptyObject(currentSong) ? null :
          <NormalPlayer
            song={currentSong}
            fullScreen={fullScreen}
            playing={playing}
            duration={duration} //总时长
            currentTime={currentTime}//播放时间
            percent={percent}//进度
            toggleFullScreen={toggleFullScreenDispatch}
            clickPlaying={clickPlaying}
            onProgressChange={onProgressChange}
            handlePrev={handlePrev}
            handleNext={handleNext}
            mode={mode}
            changeMode={changeMode}
          />
      }
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={handleEnd}></audio>
      <Toast text={modeText} ref={toastRef}/>
    </div>
  )
}

const mapStateToProps = state => ({
  fullScreen: state.getIn(['player', 'fullScreen']),
  playing: state.getIn(['player', 'playing']),
  currentSong: state.getIn(['player', 'currentSong']),
  showPlayList: state.getIn(['player', 'showPlayList']),
  mode: state.getIn(['player', 'mode']),
  currentIndex: state.getIn(['player', 'currentIndex']),
  playList: state.getIn(['player', 'playList']),
  sequencePlayList: state.getIn(['player', 'sequencePlayList'])
});

const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch(data) {
      dispatch(changePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
      dispatch(changeFullScreen(data))
    },
    togglePlayListDispatch(data) {
      dispatch(changeShowPlayList(data))
    },
    changeCurrentIndexDispatch(index) {
      dispatch(changeCurrentIndex(index))
    },
    changeCurrentDispatch(data) {
      dispatch(changeCurrentSong(data))
    },
    changeModeDispatch(data) {
      dispatch(changePlayMode(data))
    },
    changePlayListDispatch(data) {
      dispatch(changePlayList(data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(Player));
