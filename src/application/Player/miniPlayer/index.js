/*
 * @Description: 
 * @Date: 2021-05-07 14:35:32
 * @LastEditTime: 2021-07-08 17:53:31
 */
import { memo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { getName } from 'api/utils';
import { MiniPlayerContainer } from './style';
import ProgressCircle from 'baseUI/progress-circle';

function MiniPlayer(props) {
  const { song, fullScreen, playing, percent } = props;
  const { clickPlaying, setFullScreen, toggleFullScreen } = props;

  const miniPlayRef = useRef();
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={() => {
        miniPlayRef.current.style.display = 'flex';
      }}
      onExited={() => {
        miniPlayRef.current.style.display = 'none';
      }}
    >
      <MiniPlayerContainer ref={miniPlayRef} onClick={() => toggleFullScreen(true)}>
        <div className="icon">
          <div className="imgWrapper">
            {/* 暂停的时候唱片也停止旋转 */}
            <img className={`play ${playing ? '' : 'pause'}`} src={song.al.picUrl} width="40" height="40" alt="img" />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            {
              playing?
              <i className="icon-mini iconfont icon-pause" onClick={e=>clickPlaying(e,false)}>&#xe650;</i>
              :
              <i className="icon-mini iconfont icon-play" onClick={e=>clickPlaying(e,true)}>&#xe61e;</i>
            }
          </ProgressCircle>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

export default memo(MiniPlayer);
