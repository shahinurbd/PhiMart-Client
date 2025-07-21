import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {

    const [cart, setCart] = useState(null);
    const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
    const [loading, setLoading] = useState(false);

    // create a new cart
    const createOrGetCart = useCallback(async() => {
        setLoading(true);
        try{
            const response = await authApiClient.post("/carts/");
        if(!cartId) {
            localStorage.setItem("cartId", response.data.id);
            setCartId(response.data.id);

        }
        setCart(response.data);
        } catch(error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    },[cartId]);

    // Add items to the cart
    const AddCartItems = useCallback(
        async(product_id, quantity) => {
        setLoading(true);
        if (!cartId) await createOrGetCart();
        try {
            const response = await authApiClient.post(`/carts/${cartId}/items/`, {product_id, quantity});
            return response.data;
            
        } catch (error) {
            console.log("Error adding Items", error);
        } finally {
            setLoading(false);
        }
        },
        [cartId, createOrGetCart]
    );

    // update item quantity
    const updateCartItemQuantity = useCallback(async (itemId, quantity) => {
        try{
            await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {quantity,})
        } catch(error){
            console.log(error)
        }

    },[cartId]);

    // delete cart item 
    const deleteCartItems = useCallback(async(itemId) => {
        try{
            await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);
        } catch(error){
            console.log(error);
        }
    }, [cartId])


    useEffect(() => {
        const initializedCart = async() => {
            setLoading(true);
            await createOrGetCart();
            setLoading(false);
        }
        initializedCart();
    }, [createOrGetCart]);


    return {cart, createOrGetCart, AddCartItems, updateCartItemQuantity, loading, deleteCartItems};
};

export default useCart;