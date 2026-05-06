import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from "../redux/reduxSlices/order";

const MyOrders = () => {
    const navigate=useNavigate();
    const {orders,loading,error}=useSelector(state=>state.order)
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(fetchOrders())
    },[dispatch]);
    
  return (
    <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">My Orders</h2>
        <div className="relative shadow-md rounded-lg overflow-x-scroll">
        <table className="min-w-full text-left text-gray-500">
        <thead className="bg-gray-100 font-semibold text-gray-700 text-xs uppercase ">
            <tr>
                <th className="px-4 py-2 md:py-3">Image</th>
                <th className="px-4 py-2 md:py-3">Order ID</th>
                <th className="px-4 py-2 md:py-3">Created</th>
                <th className="px-4 py-2 md:py-3">Shipping Adderss</th>
                <th className="px-4 py-2 md:py-3">Items</th>
                <th className="px-4 py-2 md:py-3">Price</th>
                <th className="px-4 py-2 md:py-3">Status</th>
            </tr>
        </thead>
        <tbody>
            {orders.length>0?(
                orders.map((order)=>(
                    <tr onClick={()=>navigate(`/order/${order._id}`)} 
                    className="border-b hover:border-gray-50 cursor-pointer">
                        <td className="px-4 py-4">
                            <img src={order.orderItems[0].image} 
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"/>
                        </td>
                        <td className="px-4 py-4  font-medium text-gray-800 whitespace-nowrap">
                           #{order._id}
                        </td>
                        <td className="px-4 py-4  font-medium  ">
                           {new Date(order.createdAt).toLocaleDateString()} {""}
                           {new Date(order.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="px-4 py-4  font-medium">
                          {order.shippingAddress?
                          `${order.shippingAddress.city} , ${order.shippingAddress.country}`:"N/A"}
                        </td>
                         <td className="px-4 py-4  font-medium ">
                          {order.orderItems.length}
                        </td>
                        <td className="px-4 py-4 font-medium ">
                          ${order.totalPrice}    
                        </td>
                        <td className="px-4 py-4 font-medium ">
                          {order.isPaid?
                          <span className="p-2 rounded-full  text-xs sm:text-sm  text-green-700 bg-green-100">Paid</span>
                          :<span className="p-2 rounded-full  text-xs sm:text-sm  text-red-700 bg-red-100">Pending</span>}    
                        </td>
                    </tr>
                ))
            ):(
            <tr>
                <td  colSpan={7} className="px-4 py-4 text-center text-gray-500">
                   {loading?"Loading...":"You have no orders"}</td>
            </tr>
            )}
        </tbody>
        </table>
        </div>
    </div>
  )
}

export default MyOrders
