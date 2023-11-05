import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import 'swiper/css/pagination';
import Image from "next/image";

const MobileImageGallery = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': 'rgba(51,48,48,0.76)',
                    '--swiper-pagination-color': '#524c4c',
                    '--swiper-navigation-size': '24px',
                }}
                modules={[Zoom, Navigation, Thumbs, Pagination, FreeMode]}
                spaceBetween={5}
                navigation={true}
                zoom
                thumbs={{ swiper: thumbsSwiper }}
                pagination={{ clickable: true }}
                className="mySwiper2 w-auto m-0"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={image}>
                        <div className="swiper-zoom-container">
                            <Image height={800} width={600} src={image} alt={`Slide ${index}`} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                modules={[Thumbs]}
                className="mySwiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={image}>
                        <Image height={200} width={100} src={image} alt={`Thumbnail ${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default MobileImageGallery;
