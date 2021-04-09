/*
 * @Description: 歌手
 * @Date: 2021-04-09 17:31:34
 * @LastEditTime: 2021-04-09 17:51:46
 */
import React, { memo, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from './style';

function Singer(props){
  const [showStatus, setShowStatus] = useState(true);
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      className="fly"
      appear={true}
      unmountOnExit
      onExited={()=>props.history.goBack()}
    >
      <Container></Container>
    </CSSTransition>
  )
}

export default memo(Singer);
