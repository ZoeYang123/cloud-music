/*
 * @Description: 接口请求
 * @Date: 2021-02-23 11:52:37
 * @LastEditTime: 2021-04-20 15:01:35
 */
import { axiosInstance } from './config';

export const getBannerRequest = () =>{
  return axiosInstance.get('/banner');
}

export const getRecommendListRequset = () =>{
  return axiosInstance.get('/personalized');
}

export const getHotSingerListRequest = (count) =>{
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

//歌手列表
export const getSingerListRequest = (category,alpha,count) =>{
  return axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

//排行榜
export const getRankListRequest = () =>{
  return axiosInstance.get('/toplist/detail')
}

//歌单
export const getAlbumDetailRequest = id =>{
  return axiosInstance.get(`/playlist/detail?id=${id}`);
}

//歌手信息
export const getSingerInfoRequest = id =>{
  return axiosInstance.get(`/artists?id=${id}`);
}