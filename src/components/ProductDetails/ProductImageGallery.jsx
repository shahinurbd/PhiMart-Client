import React, { useState } from 'react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import defaultImage from "../../assets/images/default_product.jpg"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductImageGallery = ({images, ProductName}) => {
    const [thumbsSwiper] = useState(null);
    const displayImages = images.length > 0 ? images : [{image: defaultImage}];
    return (
        <div className='rounded-lg border overflow-hidden'>
            <Swiper modules={[Navigation, Thumbs]} navigation thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}} className='product-main-slider'>
                {displayImages.map((ImgObj, index) => (
                    <SwiperSlide key={index}>
                        <div className='aspect-square bg-base-100'>
                            <img className='h-full w-full object-contain' src={ImgObj.image} alt={ProductName} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductImageGallery;