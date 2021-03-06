/*
 * @Description: 歌手
 * @Date: 2021-02-23 11:52:37
 * @LastEditTime: 2021-04-09 17:40:16
 */
import { memo, useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config';

import Scroll from 'baseUI/scroll';
import Horizen from 'baseUI/horizen-item';
import { NavContainer, ListContainer, List, ListItem } from './style';

import { categoryTypes, alphaTypes } from 'api/config';
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators';
import Loading from 'baseUI/loading';

import { CategoryDataContext, CHANGE_ALPHA, CHANGE_CATEGORY } from './data';


function Singers(props) {
  // let [category, setCategory] = useState('');
  // let [alpha, setAlpha] = useState('');

  const { data, dispatch } = useContext(CategoryDataContext);
  const { category, alpha } = data.toJS();

  const { singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount } = props;

  const { getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch } = props;

  useEffect(() => {
    if(!singerList.size){
      getHotSingerDispatch();
    }
  }, [])

  let handleUpdateAlpha = (val) => {
    dispatch({type: CHANGE_ALPHA,data:val})
    updateDispatch(category, val)
  }

  let handleUpdateCategory = (val) => {
    dispatch({type:CHANGE_CATEGORY,data:val})
    updateDispatch(val,alpha)
  }

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  }

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  }

  const enterDetail = (id) =>{
    props.history.push(`/singers/${id}`)
  }

  const renderSingerList = () => {
    return (
      <List>
        {
          singerList.toJS().map((item, index) => {
            return (
              <ListItem key={item.accountId + '' + index} onClick={()=>enterDetail(item.id)}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={'分类 (默认热门):'}
          handleClick={val => handleUpdateCategory(val)}
          oldVal={category}
        />
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          handleClick={val => handleUpdateAlpha(val)}
          oldVal={alpha}
        />
      </NavContainer>
      <ListContainer>
        {enterLoading?<Loading />:''}
        <Scroll
          onScroll={forceCheck}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
        >
          {renderSingerList()}
        </Scroll>
      </ListContainer>
      {renderRoutes(props.route.routes)}
    </div>
  )
};

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)); //改变分类，pageCount清零
      dispatch(changeEnterLoading(true)); //loading
      dispatch(getSingerList(category, alpha));
    },
    //拉到底部刷新
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0));
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Singers));
