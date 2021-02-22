import { memo } from 'react';   
import SwiperCore, {  Pagination,Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

import { SliderContainer } from './style';

SwiperCore.use([Pagination,Autoplay]);

function Slider(props){
  const {bannerList} = props;
  return (
    <SliderContainer>
      <div className="before"></div>
      <Swiper
      className="slider-container"
      spaceBetween={0}
      slidesPerView={1}
      loop
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {
        bannerList.map((slider,index) =>{
          return (
            <SwiperSlide key={index}> <img src={slider.imageUrl} width="100%" height="100%" alt="推荐" /></SwiperSlide>
          )
        })
      }
    </Swiper>
    </SliderContainer>
  )
}

export default memo(Slider)