import { Suspense, useEffect, useState } from 'react';
import useCartContext from '../hooks/useCartContext';
import CartItemList from '../components/Cart/CartItemList';
import CartSummary from '../components/Cart/CartSummary';

const Cart = () => {
    const {cart, cartId, createOrGetCart, updateCartItemQuantity, loading, deleteCartItems} = useCartContext();

    const [localCart, setLocalCart] = useState(cart);

    useEffect(() => {
        if(!cart && !loading) createOrGetCart();
    }, [createOrGetCart, cart, loading]);

    useEffect(() => {
        setLocalCart(cart);
    },[cart]);

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        const prevLocalCartCopy = localCart;
        setLocalCart((prevLocalCart) => {
            const updatedItems = prevLocalCart.items.map((item) => item.id === itemId ? {
                ...item,
                quantity: newQuantity,
                total_price: item.product.price * newQuantity,
            } : item
        );

        return {
            ...prevLocalCart,
            items: updatedItems,
            total_price: updatedItems.reduce(
                (sum, item) => sum + item.total_price, 0
            ),
        };
        });
        try{
            await updateCartItemQuantity(itemId, newQuantity);
        } catch(error) {
            console.log(error);
            setLocalCart(prevLocalCartCopy);
        }
    }

    const handleRemoveItems =  async(itemId) => {
        setLocalCart((prevLocalCart) => {

            const updatedItems = prevLocalCart.items.filter((item) => item.id != itemId);

            return {
            ...prevLocalCart,
            items: updatedItems,
            total_price: updatedItems.reduce(
                (sum, item) => sum + item.total_price, 0
            ),
            };
        });

        try{
            await deleteCartItems(itemId);
        } catch(error){
            console.log(error);
        }
    };

    if(!localCart) return <div>Cart Not Found!</div>
    return (
        <div className='container mx-auto px-4 py-8'>
           <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
             <div>
                <Suspense fallback={<div className='h-100 w-100 mx-auto flex justify-center items-center'><span className="loading loading-dots loading-lg"></span></div>}>
                    <CartItemList items={localCart.items}    handleUpdateQuantity=  {handleUpdateQuantity}
                    handleRemoveItems={handleRemoveItems} />
                </Suspense>
            </div>
            <div>
                <CartSummary totalPrice={localCart.total_price} itemCount={localCart.items.length} cartId={cartId} />
            </div>
           </div>
        </div>
    );
};

export default Cart;