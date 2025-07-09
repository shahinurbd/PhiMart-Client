import { useEffect, useState } from "react"
import apiClient from "../services/api-client";

const useFatchProducts = (currentPage, priceRange, selectedCategory, searchQuery, sortOrder) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchProducts = async() => {
        setLoading(true)
        try{
            const response = await apiClient.get(`products/?category_id=&price__gt=${priceRange[0]}&price__lt=${priceRange[1]}&page=${currentPage}&category_id=${selectedCategory}&search=${searchQuery}&ordering=${sortOrder}`);
            const data = await response.data;

            setProducts(data.results);
            setTotalPages(Math.ceil(data.count / data.results.length));
        } catch(error){
            console.log(error)
        } finally{
            setLoading(false)
        }
    };
    fetchProducts();
    }, [currentPage, priceRange,selectedCategory,searchQuery, sortOrder]);

    return {products, loading, totalPages}
};

export default useFatchProducts;