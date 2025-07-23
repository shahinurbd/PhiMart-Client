import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import authApiClient from "../../services/auth-api-client";
const Order = () => {

  const {user} = useAuthContext();
  const [orders, setOrders] = useState([]);
  
      useEffect(() => {
        authApiClient.get("/orders/").then((res) => setOrders(res.data));
      },[orders])
  
  return (
    <div className="mt-6 card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
              
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {user.id === order.user ? user.first_name : "Unknown"}
                </td>
                <td>
                  <div className="badge badge-success">{order.status}</div>
                </td>
                <td>{order.created_at}</td>
                <td>${order.total_price}</td>
              </tr>
            
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;