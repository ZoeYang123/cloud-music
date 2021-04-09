/*
 * @Description: 
 * @Date: 2021-04-09 10:38:52
 * @LastEditTime: 2021-04-09 11:44:59
 */
import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from './constants';
import { getAlbumDetailRequest } from 'api/request';
import { fromJS } from 'immutable';

const changeCurrentAlbum = (data) =>({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data)
});

export const changeEnterLoading = (data) => ({
  type: CHANGE_ENTER_LOADING,
  data: fromJS(data)
});

export const getAlbumList = (id) =>{
  return dispatch =>{
    getAlbumDetailRequest(id).then(res=>{
      let data = res.playlist;
      dispatch(changeCurrentAlbum(data));
      dispatch(changeEnterLoading(false));
    }).catch(()=>{
      console.log('获取album数据失败！');
    })
  }
}
