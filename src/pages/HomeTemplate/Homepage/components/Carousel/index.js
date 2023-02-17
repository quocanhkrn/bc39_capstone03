import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Autoplay } from "swiper";
import Loader from "components/Loader";
import { HomeCarouselFetchData } from "./_duck/actions";

function Carousel() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.HomeCarouselReducer.loading);
  const bannerData = useSelector((state) => state.HomeCarouselReducer.data);

  useEffect(() => {
    dispatch(HomeCarouselFetchData());
  }, []);

  if (loading) {
    return (
      <section className="carousel">
        <Loader />
      </section>
    );
  }

  return (
    <>
      <section className="carousel container">
        <Swiper
          modules={[Navigation, EffectCoverflow, Autoplay]}
          speed={1000}
          loop={true}
          slidesPerView={1}
          centeredSlides={true}
          effect={"coverflow"}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          navigation
          breakpoints={{
            992: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 1,
            },
          }}>
          {bannerData.map((banner) => {
            return (
              <SwiperSlide key={banner.maBanner}>
                <a href="#">
                  <img src={banner.hinhAnh} />
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </>
  );
}

export default Carousel;
