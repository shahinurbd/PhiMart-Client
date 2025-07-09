import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api-client';
import CategoryItems from './CategoryItems';

const Category = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        apiClient
        .get("/categories")
        .then((res) => setCategories(res.data));
    }, []);
    return (
        <div className='px-2 md:px-8 py-10'>
            <div className='flex justify-between items-center px-4 md:px-8 py-8'>
                <h2 className='text-xl md:text-4xl font-bold'>
                    Browse Categories
                </h2>
                <a href="#" className='btn btn-secondary text-white p-2 md:p-4 rounded-full text-sm md:text-lg'>View All</a>
            </div>
           <section>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                     {categories.map((category, index) => (
                    <CategoryItems key={category.id} index={index} category={category} />
                    ))}
                </div>
           </section>
        </div>
    );
};

export default Category;