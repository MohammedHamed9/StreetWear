import { useEffect } from "react";
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getAllOrders } from "../../redux/reduxSlices/admin";
import { fetchProductsWithFilters } from "../../redux/reduxSlices/product";

const AdminDashborad = () => {
  const {orders,totalOrders,totalSales,loading:adminLoading,error:adminError}=useSelector(state=>state.admin);
  const {products,loading:productLoading,error:productError}=
  useSelector(state=>state.product);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getAllOrders());
    dispatch(fetchProductsWithFilters());
  },[dispatch]);
  
  return (
   <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-gray-900 text-3xl font-bold">Admin Dashboard</h1>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
             gap-6 ">

                <div className="shadow-md p-4 rounded-lg">
                <h3 className="text-xl font-semibold">Revenue</h3>
                {
                  adminLoading?(
                    <p className="text-gray-600">Loading...</p>
                  ):(
                    <p className="text-2xl ">${totalSales.toFixed(2)}</p>
                  )
                }
                </div>

                <div className="shadow-md p-4 rounded-lg">
                <h3 className="text-xl font-semibold">Total Orders</h3>
                {
                  adminLoading?(
                    <p className="text-gray-600">Loading...</p>
                  ):(
                    <p className="text-2xl ">{totalOrders}</p>
                  )
                }
                <Link to={"/admin/orders"}
                 className="text-blue-500 hover:underline">Manage Orders</Link>
                </div>

                <div className="shadow-md p-4 rounded-lg">
                <h3 className="text-xl font-semibold">Total Products</h3>
                {productLoading?(
                  <p className="text-gray-600">Loading...</p>
                ):(
                <p className="text-2xl ">{products&&products.length}</p>
                )}
                <Link className="text-blue-500 hover:underline">Manage Products</Link>
                </div>
            </div>

            <div className="mt-6">
              <h1 className="text-gray-900 text-2xl font-bold">Recent Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full  text-left shadow-md text-gray-500" >
                <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
                <tr>
                <th className="px-4 py-3 ">order id</th>
                <th className="px-4 py-3 ">user</th>
                <th className="px-4 py-3 ">total price</th>
                <th className="px-4 py-3 ">status</th>
                </tr>
                </thead>

                <tbody>
                    {adminLoading?(
                      <td colSpan={4}
                        className="text-center text-lg text-gray-500 p-4">Loading...</td>
                    )
                    :orders.length>0?(
                        orders.map((order)=>(
                        <tr key={order} className="border-b hover:bg-gray-50 cursor-pointer">
                           <td className="p-4"> {order._id}</td>
                           <td className="p-4"> {order.user.role} User</td>
                           <td className="p-4"> ${order.totalPrice.toFixed(2  )}</td>
                           <td className="p-4"> {order.status}</td>

                        </tr>
                    ))
                    ):(<tr>
                        <td colSpan={4}
                        className="text-center text-gray-500 p-4">No recent orders found.</td>
                    </tr>)}
                </tbody>
            </table>
            </div>
            </div>
        </div>
  )
}

export default AdminDashborad
