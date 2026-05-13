import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import { fetchOrder } from "../redux/reduxSlices/order";

const OrderDetails = () => {
  const {orderId}=useParams();
  console.log(orderId)
  const {selectedOrder,loading,error}=useSelector(state=>state.order);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchOrder(orderId));
    },[dispatch]);
    if(error)
      return <p>Error:{error}</p>
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 ">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Order Details</h2>
      {loading? (
         <p className="text-center text-gray-400 text-xl font-semibold">Loading...</p>
      ):
      !selectedOrder?(
        <p className="text-center text-gray-900 text-xl font-semibold">No Orders Yes</p>
      ):(
        <div className="p-4 sm:p-6 border rounded-lg">
          <div className="flex flex-col md:flex-row justify-between"> 
          <div>
          <h3 className="font-semibold text-lg md:text-xl">Order ID: #{selectedOrder._id}</h3>
          <p className="text-gray-600">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
          </div>
           <div className="flex flex-col items-start md:items-end mt-4 sm:mt-0">
          <p className={`${selectedOrder.isPaid?
          "bg-green-100 text-green-700":
            "bg-red-100 text-red-700"}
             font-medium text-sm px-3 py-1 rounded-full mb-2 text-center`}>
              {selectedOrder.isPaid?"Approved":"Pending"}
          </p>
          <p className={`${selectedOrder.isDelivered?
          "bg-green-100 text-green-700":
            "bg-yellow-100 text-yellow-700"}
             font-medium text-sm px-3 py-1 rounded-full`}>
              {selectedOrder.isDelivered?"Delivared":"Pending Delivary"}
          </p>
          </div>
          </div>
          {/* CUSTOMER PAYMENT SHIPPING INFO  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-5 md:mt-0">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method: {selectedOrder.paymentMethod}</p>
              <p>Status: {selectedOrder.isPaid ? "Paid" : "Unpaid"}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method: {selectedOrder.shippingMethod}</p>
              <p>
                Address:{" "}
                {`${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.country}`}
              </p>
            </div>
        </div>
          {/* PRODUCTS LIST */}
          <div className="overflow-x-auto">
            <h2 className="text-lg font-medium mb-4">Proudcts</h2>
            <table className="min-w-full text-gray-600">
              <thead className="bg-gray-100">
                <tr >
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2 ">Unit Price</th>
                  <th className="px-4 py-2 ">Quantity</th>
                  <th className="px-4 py-2 ">Total</th>
                </tr>
              </thead>
              <tbody>
              {selectedOrder.orderItems.map((item)=>(
                <tr key={item} className="border-b">
                  <td className="py-2 px-4 flex items-center">
                    <img src={item.image} alt="order image" 
                    className="w-12 h-12 object-cover rounded-lg mr-4 flex-shrink-0"/>
                 <Link to={`/product/${item.productId}`} 
                 className="text-blue-500 hover:underline block ">
                 {item.name}</Link>
                  </td>
                <td className="py-2 px-4 ">{item.price}</td>
                <td className="py-2 px-4 ">{item.quantity}</td>
                <td className="py-2 px-4 ">{item.price *item.quantity}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
              <Link to="/my-orders" 
                 className="text-blue-500 hover:underline block mt-6">
                 Back To my orders</Link>   
        </div>
      )}
    </div>
  )
}

export default OrderDetails
