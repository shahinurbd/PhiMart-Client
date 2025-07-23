import authApiClient from "../../services/auth-api-client";

const CartSummary = ({ totalPrice, itemCount, cartId }) => {
  const shipping = itemCount === 0 || totalPrice > 1000 ? 0 : 10;
  const tax = totalPrice * 0.10;
  const orderTotal = totalPrice + shipping + tax;

  const deleteCart = () => {
    localStorage.removeItem("cartId");
  };

  const createOrder = async() => {
    try{
      const order = await authApiClient.post("/orders/", {cart_id: cartId})
      if(order.status === 201){
        deleteCart();
        alert("Order Placed Successfully");
      }
    } catch(error){
      console.log(error);
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal {itemCount} items</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Order Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button onClick={createOrder} disabled={itemCount === 0} className="btn btn-primary w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;