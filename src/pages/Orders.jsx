import React, { useEffect, useState } from 'react';
import OrderCard from '../components/Orders/OrderCard';
import authApiClient from '../services/auth-api-client';

const Orders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
      authApiClient.get("/orders/").then((res) => setOrders(res.data));
    },[orders])

    const handleCancelOrder = async(orderId) => {
    try{
        const response = await authApiClient.post(`/orders/${orderId}/cancel/`);
        if(response.status === 200){
          setOrders(prevOrder => prevOrder.map(order => order.id === orderId ? {...order, status: "Canceled"} : order))
        };
      } catch(error){
        console.log(error);
      }
    }


    return (
        <div className='container mx-auto py-8 px-4'>
            <h1 className='text-2xl font-bold pb-4'>Order Details</h1>
        {orders.map((order) => (
        <OrderCard key={order.id} order={order} onCancel={handleCancelOrder}/>
      ))}

        </div>


    );
};

export default Orders;