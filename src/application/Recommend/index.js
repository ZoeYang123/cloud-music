import { memo, useEffect } from 'react';
import styled from'styled-components';
import { connect } from 'react-redux';
import { forceCheck } from 'react-lazyload';

import * as actionTypes from './store/actionCreators';

import Slider from 'components/slider';
import RecommendList from 'components/list';
import Scroll from 'baseUI/scroll';
import Loading from 'baseUI/loading';

export const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
`

function Recommend(props) {
  const {bannerList,recommendList, enterLoading} = props;

  const {getBannerDataDispatch,getRecommendListDataDispatch} = props;

  useEffect(() => {
    if(!bannerList.size){
      getBannerDataDispatch ();
    }
    if(!recommendList.size){
      getRecommendListDataDispatch ();
    }
  }, []);

  const bannerListJS = bannerList?bannerList.toJS():[];
  const recommendListJS = recommendList?recommendList.toJS():[];
  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
      {enterLoading?<Loading></Loading>:null}
    </Content>
  )
};

const mapDispatchToProps = (dispatch) =>{
  return {
    getBannerDataDispatch(){
      dispatch(actionTypes.getBannerList())
    },
    getRecommendListDataDispatch(){
      dispatch(actionTypes.getRecommendList())
    }
  }
}

const mapStateToProps = (state) =>({
  bannerList: state.getIn(['recommend','bannerList']),
  recommendList: state.getIn(['recommend','recommendList']),
  enterLoading: state.getIn(['recommend','enterLoading'])
})

export default connect(mapStateToProps,mapDispatchToProps)(memo(Recommend));
