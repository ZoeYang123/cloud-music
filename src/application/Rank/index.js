/*
 * @Description: 
 * @Date: 2021-02-23 11:52:37
 * @LastEditTime: 2021-03-04 18:21:59
 */
import { memo, useEffect } from 'react';
import { connect } from "react-redux";
import { getRankList } from './store';

function Rank(props) {
  const {rankList:list, loading} =props;
  const { getRankListDataDispatch } = props;

  let rankList = list?list.toJS():[];

  useEffect(()=>{
    getRankListDataDispatch();
  },[]);
  return (
    <div>
     Rank
    </div>
  )
};

const mapStateToProps = (state) =>({
  rankList: state.getIn(['rank','rankList']),
  loading: state.getIn(['rank','loading'])
})

const mapDispatchToProps = (dispatch) =>{
  return {
    getRankListDataDispatch(){
      dispatch(getRankList())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(memo(Rank));
