/*
 * @Description: 工具函数
 * @Date: 2021-02-23 11:52:37
 * @LastEditTime: 2021-04-09 11:39:13
 */
export const getCount = (count) =>{
  if(count < 0) return;
  if(count < 10000){
    return count;
  }else if(Math.floor(count / 10000) < 10000){
    return Math.floor(count/1000)/10 + '万'
  }else{
    return Math.floor(count / 10000000)/10 + '亿'
  }
}

//防抖函数
export const debounce = (func,delay) =>{
  let timer;
  return function(...args){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      func.apply(this,args);
      clearTimeout(timer);
    },delay)
  }
}

//过滤函数
export const filterIndex = rankList =>{
  for(let i = 0; i < rankList.length - 1; i++){
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
}

//处理歌手列表拼接歌手名字
export const getName = list =>{
  let str = '';
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name;
    return item;
  });
  return str;
}

//判断对象是否为空
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;