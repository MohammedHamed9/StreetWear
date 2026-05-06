const orders = [
  {
    _id: 12312321,
    user: {
      name: "John Doe",
    },
    totalPrice: 110,
    status: "Processing",
  },
   {
    _id: 12312321,
    user: {
      name: "Mohamed hamed",
    },
    totalPrice: 2200,
    status: "Processing",
  },
];
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrder } from '../../redux/reduxSlices/admin';
import { useNavigate } from 'react-router-dom';

const OrderManagment = () => {
  const{orders,totalOrders,loading,error}=useSelector(state=>state.admin);
  const {user}=useSelector(state=>state.auth);
  const dipatch=useDispatch()
    const navigate=useNavigate()
console.log()
   useEffect(()=>{
    if(!user&&user.role!='Admin')
      navigate('/')
    else
      dipatch(getAllOrders());

    },[dipatch,user,navigate])

    function handelStatusChange(orderId,value){
      dipatch(updateOrder({id:orderId,orderData:{status:value}}))
    }
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order Managment</h1>
      <div className="overflow-x-auto shadow-md rounded-md">
        <table className="text-gray-500 text-left w-full">
            <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
            <tr>
            <th className="py-2 px-4 w-2/5">Orderid</th>
            <th className="py-3 px-4">Customer</th>
            <th className="py-3 px-4">Total Price</th>
            <th className="py-3 px-4">status</th>
            <th className="py-3 px-4">actions</th>
            </tr>
            </thead>
            <tbody>
            {loading?(
              <tr>
              <td colSpan={5}
            className="text-center text-lg text-gray-500 p-4">Loading...</td>
            </tr>
            ):
            orders.length>0?(
                  orders.map((order)=>(
                <tr key={order} className="border-b hover:bg-gray-50 cursor-pointer">
                <td className="p-4 font-semibold text-gray-900 whitespace-normal">#{order._id}</td>
                <td className="p-4">{order.user.name}</td>   
                <td className="p-4">${order.totalPrice.toFixed(2)}</td> 
                <td>
                    <select name="status" value={order.status}
                    onChange={(e)=>handelStatusChange(order._id,e.target.value)}
                     className="border border-gray-300 bg-gray-50 p-2 rounded-md
                     text-gray-900 text-sm
                      focus:border-blue-500 focus:ring-blue-500 block">
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </td>
                <td className="p-4">
                    <button onClick={()=>handelStatusChange(order._id,"Delivered")} className="py-2 px-4 bg-green-500 hover:bg-green-600
                     transition-colors text-white rounded-lg">Mark is Delivered</button>
                     </td> 

                </tr>
            ))
            ):(<tr>
                <td colSpan={5}
                className="p-4 text-center text-gray-500">
                    No Orders found.</td>
            </tr>
               
            )}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManagment
