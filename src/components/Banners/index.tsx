import React, { useEffect } from "react";
import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// import required modules
import SwiperClass, { Autoplay, EffectFade, Navigation, Mousewheel, Pagination } from "swiper";
import { useQuery } from "@apollo/client";
import { PUBLIC_ANNOUNCEMENT } from "../../graphql/announcement.graphql";
import Image from "next/image";
import Button from "../elements/Button";
import { TQueryPlublicBanners } from "../../types/announcement";

interface SwiperRef extends React.HTMLAttributes<HTMLElement> {
  swiper: SwiperClass;
}

type TBanners = {
  data: TQueryPlublicBanners
}

const Banners: React.FC<TBanners> = ({ data }) => {
  const swiperRef = React.useRef<SwiperRef>(null)

  useEffect(() => {
  }, [])


  return (
    <Main>
      <div>
        <Button className="left" variant="text" label={<TriangleIcon />} onClick={() => swiperRef.current?.swiper.slidePrev()} />
        <Swiper
          ref={swiperRef}
          loop
          modules={[EffectFade, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {data?.banners?.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Image src={banner.image} alt="banner" fill style={{ objectFit: "contain" }} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button className="right" variant="text" label={<TriangleIcon />} onClick={() => swiperRef.current?.swiper.slideNext()} />
      </div>
    </Main >
  )
}

export default Banners

const TriangleIcon = () => (<svg className="swipe-icon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M328 112L184 256l144 144" /></svg>)

const Main = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  gap: 20px;
  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 80%;
    aspect-ratio: 5/1;
    min-height: 1px;
    .MuiButton-root {
      min-width: auto;
      padding: 0;
      border-radius: 100%;
      svg.swipe-icon {
        width: 40px;
        > path {
          color: ${({ theme }) => theme?.colors?.text?.dark};
          stroke-width: 20;
        }
      }
    }
    .MuiButton-root.right svg.swipe-icon {
      rotate: 180deg;
    }

    .swiper {
        width: 100%;
        height: 100%;
      }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      /* Center slide text vertically */
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper-slide img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .swiper-slide {
      width: 80%;
    }

    .swiper-slide:nth-child(2n) {
      width: 60%;
    }

    .swiper-slide:nth-child(3n) {
      width: 40%;
    }
  }
`

const Banner = styled.div`
  display: block;
`
const BannerSmall = styled.div`
  display: flex;
`