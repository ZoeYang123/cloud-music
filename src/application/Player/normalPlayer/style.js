/*
 * @Description: 
 * @Date: 2021-05-12 17:35:19
 * @LastEditTime: 2021-05-26 16:47:22
 */
import styled, {keyframes} from 'styled-components';
import style from 'assets/global-style';

export const NormalPlayerContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: ${style['background-color']};
  .background{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
    &.layer{
      background: ${style['font-color-desc']};
      opacity: 0.3;
      filter: none;
    }
  }
`;

export const Top = styled.div`
  position: relative;
  margin-bottom: 25px;
  .back{
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .iconfont{
      display: block;
      padding: 9px;
      font-size: 24px;
      color: ${style['font-color-desc']};
      font-weight: bold;
      transform: rotate(90deg);
    }
  }
  .title{
    width: 70%;
    margin:0 auto;
    line-height: 40px;
    text-align: center;
    font-size: ${style['font-size-l']};
    color:${style['font-color-desc']};
    ${style.noWrap()}
  }
`;

export const Middle = styled.div`
  
`;