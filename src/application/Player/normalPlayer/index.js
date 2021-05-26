/*
 * @Description: 
 * @Date: 2021-05-12 15:42:53
 * @LastEditTime: 2021-05-26 16:27:13
 */
import { memo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { getName } from 'api/utils';
import { NormalPlayerContainer, Middle, Top, Bottom, Operators, CDWrapper } from './style';

function NormalPlayer(props) {
  const { song, fullScreen } = props;
  const { toggleFullScreenDispatch } = props;

  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();

  return (
    <CSSTransition
      classNames="normal"
      in={fullScreen}
      timeout={400}
      mountOnEnter
    >
      <NormalPlayerContainer>
        <div className="background">
          <img src={song.al.picUr + '?param=300x300'} width="100%" height="100%" alt="歌曲图片" />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back">
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <h1 className="title">{song.name}</h1>
          <h1 className="subtitle">{getName(song.ar)}</h1>
        </Top>
        <Middle>
          <CDWrapper>
            <div className="cd">
              <img
                className="image play"
                src={song.al.picUrl + '?param=400x400'}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <Operators>
            <div className="icon i-left">
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i className="iconfont">&#xe723;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  )
}

export default memo(NormalPlayer);
