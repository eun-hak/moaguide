'use client';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { memo, useState } from 'react';
import { IDivide } from '@/types/Diviend';
import Link from 'next/link';
import { CATEGORY } from '@/static/category';
interface DividendProps {
  dividend: IDivide[];
}

const Dividend = memo(({ dividend }: DividendProps) => {
  const [swiperIndex, setSwiperIndex] = useState(0); // -> 페이지네이션용

  const [swiper, setSwiper] = useState<SwiperClass>(); // -> 슬라이드용
  const handlePrev = () => {
    swiper?.slidePrev();
  };
  const handleNext = () => {
    swiper?.slideNext();
  };
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  return (
    <div className="  w-full max-w-[1000px]  mx-[50px] relative  z-5 flex justify-center items-center">
      <div>
        <div
          className="flex  bg-white w-[40px] h-[40px]  justify-center items-center   z-10 rounded-full mr-[10px]"
          onClick={handlePrev}>
          <Image
            src="/images/product/CaretLeft.svg"
            alt="leftarrow"
            width={20}
            height={20}
            className=" cursor-pointer"
          />
        </div>
      </div>
      <Swiper
        onActiveIndexChange={(e: SwiperClass) => setSwiperIndex(e.realIndex)}
        onSwiper={(e: SwiperClass) => {
          setSwiper(e);
        }}
        loop={true}
        spaceBetween={0}
        slidesPerView={2}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false // 사용자 상호작용시 슬라이더 일시 정지 비활성
        // }}
        // navigation
        modules={[Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        }}
        className="mySwiper flex justify-center">
        {dividend?.map((item) => {
          return (
            <SwiperSlide className=" flex " key={item.product_Id}>
              <Link href={`/product/detail/${item.category}/${item.product_Id}`}>
                <div className=" md:max-w-[456px]  desk2:max-w-[390px]  desk:max-w-[300px] h-[84px] px-5 py-4 bg-white rounded-lg flex-row  desk:justify-start  items-center  flex mx-auto  relative">
                  <div className=" w-full max-w-[52px] max-h-[52px] rounded-[28.50px] ">
                    <Image
                      src={`https://d2qf2amuam62ps.cloudfront.net/img/${item?.product_Id}.jpg`}
                      alt="Building"
                      width={52}
                      height={52}
                      className="rounded-lg "
                    />
                  </div>

                  <div className=" flex flex-col items-start justify-start md:ml-[20px] desk:ml-[16px] flex-grow ">
                    <div className="">
                      {CATEGORY[item.category]}
                      <div className="w-full font-bold mt-1">{item.name}</div>
                    </div>
                    <div className=" font-bold flex justify-center items-center text-purple-600   desk:block  md:hidden">
                      (모집률 {item.recruitmentRate.toLocaleString()}%)
                    </div>
                  </div>

                  <div className="ml-[46px] font-bold flex justify-center items-center text-purple-600 mt-[20px] desk:hidden md:block  ">
                    (모집률 {item.recruitmentRate.toLocaleString()}%)
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div>
        <div
          className="flex  bg-white w-[40px] h-[40px]  justify-center items-center    z-10 rounded-full ml-[10px]"
          onClick={handleNext}>
          <Image
            src="/images/product/CaretRight.svg"
            alt="rightarrow"
            width={20}
            height={20}
            className=" cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
});

Dividend.displayName = 'Dividend';

export default Dividend;
