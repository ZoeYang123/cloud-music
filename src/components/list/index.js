/*
 * @Description: 
 * @Date: 2021-02-23 11:52:37
 * @LastEditTime: 2021-03-16 17:41:31
 */
import { memo } from 'react';
import LazyLoad from 'react-lazyload';
import { withRouter } from 'react-router-dom';

import { getCount } from 'api/utils';
import { ListWrapper, List, ListItem } from './style';

function RecommendList(props) {
  const { recommendList } = props;

  const enterDetail = (id) =>{
    props.history.push(`/recommend/${id}`);
  }

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          recommendList.map((item, index) => {
            return (
              <ListItem key={item.id + index} onClick={()=>enterDetail(item.id)}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  {/* 加此参数可以减小请求的图片资源大小 */}
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music" />}>
                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default memo(withRouter(RecommendList));