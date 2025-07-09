import React from 'react';
import Hero from '../components/Home/Hero';
import CarouselSlide from '../components/Carousel/CarouselSlide';
import HeroCarousel from '../components/Carousel/HeroCarousel';
import Features from '../components/features';
import Product from '../components/Products/Product';
import Discount from '../components/Discount/DiscountSection';
import Category from '../components/Categories/Category';


const Home = () => {
    return (
       <div>
        <HeroCarousel />
        <Features />
        <Category />
        <Product />
        <Discount />
        
       </div>
    );
};

export default Home;