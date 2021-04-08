/*
 * @Description: 
 * @Date: 2021-03-17 10:59:06
 * @LastEditTime: 2021-04-08 17:43:00
 */
import { memo, forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import style from 'assets/global-style';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index:100;
  display: flex;
  line-height: 40px;
  color: ${style['font-color-light']};
  .back{
    margin-right:5px;
    font-size:20px;
    width:20px;
  }
  >h1{
    font-size:${style['font-size-l']};
    font-weight:700;
  }
`;

const Header = forwardRef((props, ref) => {
  const { handleClick, title, isMarquee } = props;

  return (
    <HeaderContainer ref={ref}>
      <i className='iconfont back' onClick={handleClick}>&#xe655;</i>
      {
        isMarquee ? <marquee><h1>{title}</h1></marquee>:<h1>{title}</h1>
      }
    </HeaderContainer>
  )
})

Header.defaultProps = {
  handleClick: () => { },
  title: '标题',
  isMarquee:false
};

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool
};

export default memo(Header);



