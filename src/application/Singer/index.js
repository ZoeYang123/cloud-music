/*
 * @Description: 歌手
 * @Date: 2021-04-09 17:31:34
 * @LastEditTime: 2021-04-10 18:24:50
 */
import React, { memo, useState, useRef, useEffect, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper } from './style';

import Header from 'baseUI/header';
import Scroll from 'baseUI/scroll';
import SongList from '../SongsList';
import SongsList from '../SongsList';

import { HEADER_HEIGHT } from 'api/config';

function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);

  const collectButton = useRef();
  const imageWrapper = useRef();
  const songScrollWrapper = useRef();
  const songScroll = useRef();
  const header = useRef();
  const layer = useRef();

  //图片初始高度
  const initialHeight = useRef(0);

  //往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(()=>{
    let h = imageWrapper.current.offsetHeight;
    songScrollWrapper.current.style.top = `${h - OFFSET} px`;
    initialHeight.current = h;
    //把遮罩先放在下面，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET} px`;
    songScroll.current.refresh();
  },[]);

  const setShowStatusFalse = useCallback(()=>{
    setShowStatus(false);
  },[]);

  const artist = {
    picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs: [
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      // 省略 20 条
    ]
  }

  const handleScroll = pos =>{
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    //指的是滑动距离占图片高度的百分比
    const percent = Math.abs(newY/height);
    if(newY > 0){
      imageDOM.style['transform'] = `scale(${1 + percent})`;
      buttonDOM.style['transform'] = `translate3d(0,${newY}px,0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    }else if(newY>=minScrollY)
  }

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      className="fly"
      appear={true}
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header title={"头部"} handleClick={setShowStatusFalse} ref={header}></Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
          <CollectButton ref={collectButton}>
            <i className="iconfont">&#xe62d;</i>
            <span className="text">收藏</span>
          </CollectButton>
          <BgLayer ref={layer}></BgLayer>
          <SongListWrapper ref={songScrollWrapper}>
            <Scroll ref={songScroll} onScroll={handleScroll}>
              <SongsList
                songs={artist.hotSongs}
                showCollect={false}
              />
            </Scroll>
          </SongListWrapper>
        </ImgWrapper>
      </Container>
    </CSSTransition>
  )
}

export default memo(Singer);
