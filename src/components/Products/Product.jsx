import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { Navigation } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ErrorAlert from '../ErrorAlert';
import apiClient from '../../services/api-client';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        apiClient
        .get("/products/")
        .then((res) => setProducts(res.data.results))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));

    }, []);
    return (
        <section className='mx-auto px-4 md:px-8 py-5 md:py-16 bg-gray-50'>
            <div className='flex justify-between items-center px-4 md:px-8'>
                <h2 className='text-xl md:text-4xl font-bold'>
                    Trending Products
                </h2>
                <a href="#" className='btn btn-secondary text-white p-2 md:p-4 rounded-full text-sm md:text-lg'>View All</a>
            </div>

            {/* Snippper */}
            {isLoading && (
                <div className='flex justify-center items-center py-10'>
                    <span className="loading loading-spinner text-secondary loading-xl"></span>
                </div>
            )}

            {error && <ErrorAlert error={error}/>}

            {/* Product Slider */}
            {!isLoading && !error && products.length > 0 && (
                <Swiper 
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
                640: {slidesPerView: 2},
                1024: {slidesPerView: 3}
            }}
            navigation
            className='mt-4 px-4 container'
            >
            {products.map((product) => (
                <SwiperSlide key={product.id} className='flex justify-center'>
                <ProductItem key={product.id} product={product} />
                </SwiperSlide>
                
            ))}
            
        </Swiper>
        )}
        {!isLoading && !error && products.length === 0 && (
            <p className='text-center text-gray-500 mt-6'>No Products Available</p>
        )} 
        </section>
    );
};

export default Product;