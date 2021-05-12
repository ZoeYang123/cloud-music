/*
 * @Description: 
 * @Date: 2021-05-12 15:42:53
 * @LastEditTime: 2021-05-12 17:42:12
 */
import { memo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { NormalPlayerContainer, Middle } from './style';

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
      <NormalPlayerContainer ref={normalPlayerRef}>
        <Middle ref={cdWrapperRef}></Middle>
      </NormalPlayerContainer>
    </CSSTransition>
  )
}

export default memo(NormalPlayer);
