/*
 * @Description: 工具函数
 * @Date: 2021-02-23 11:52:37
 * @LastEditTime: 2021-02-24 16:50:47
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