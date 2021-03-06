/*
 * @Description: 
 * @Date: 2021-02-23 11:52:37
 * @LastEditTime: 2021-04-09 14:06:59
 */
import { memo, useEffect } from 'react';
import { connect } from "react-redux";
import { renderRoutes } from 'react-router-config';

import { getRankList } from './store';
import { filterIndex } from 'api/utils';

import Scroll from 'baseUI/scroll';
import Loading from 'baseUI/loading';
import { EnterLoading } from 'application/Singers/style';

import { Container, List, ListItem, SongList } from './style';

function Rank(props) {
  const { rankList: list, loading } = props;
  const { getRankListDataDispatch } = props;

  let rankList = list ? list.toJS() : [];

  useEffect(() => {
    getRankListDataDispatch();
  }, []);

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const renderRankList = (list, global) => {
    return (
      <List gloalRank={global}>
        {
          list.map((item) => {
            return (
              <ListItem key={item.coverImgId_str} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }

  let displayStyle = loading ? { 'display': 'none' } : { 'display': '' };

  const enterDetail = (detail) =>{
    props.history.push(`/rank/${detail.id}`)
  }

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>全球榜</h1>
          {renderRankList(globalList, true)}
          {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  )
};

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Rank));
