import { FaUsers, FaBoxOpen, FaClipboardList, FaStore,FaSignOutAlt, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom"
import { logout } from "../../redux/reduxSlices/auth";
import { clearCart } from "../../redux/reduxSlices/cart";

const AdminSidbar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  
  function  handelLogout(){
    dispatch(logout());
    dispatch(clearCart());
    navigate("/")
    }
  return (
    <div>
        <Link to={"/admin"}
          className="text-2xl md:text-3xl font-bold font-sans">StreetWear</Link>
       
        <div className="mt-6 ml-6">
            <h2 className="text-xl font-medium">Admin Dashboard</h2>
            <nav className="mt-6 flex flex-col gap-2 ">
                <NavLink to={"/admin/users"} 
                className={({isActive})=>
                isActive?"flex items-center gap-2  bg-gray-700 px-4 py-3 rounded" :
                "flex items-center gap-2 hover:bg-gray-700   px-4 py-3 rounded"}>
                <FaUsers /> 
                <span>Users</span> </NavLink>

                <NavLink to={"/admin/products"} 
                className={({isActive})=>
                isActive?"flex items-center gap-2  bg-gray-700 px-4 py-3 rounded" :
                "flex items-center gap-2 hover:bg-gray-700  px-4 py-3 rounded"}>
                <FaBoxOpen /> 
                <span>Products</span> </NavLink>

                <NavLink to={"/admin/orders"} 
                className={({isActive})=>
                isActive?"flex items-center gap-2  bg-gray-700 px-4 py-3 rounded" :
                "flex items-center gap-2 hover:bg-gray-700  px-4 py-3 rounded"}>
                <FaClipboardList /> 
                <span>Orders</span> </NavLink>

                <NavLink to={"/"} 
                className={({isActive})=>
                isActive?"flex items-center gap-2  bg-gray-700 px-4 py-3 rounded" :
                "flex items-center gap-2 hover:bg-gray-700  px-4 py-3 rounded"}>
                <FaStore />
                <span>Shop</span> </NavLink>   
            </nav>
        </div>
        <button onClick={handelLogout}
        className="text-sm flex items-center justify-center gap-2 
         mt-6 bg-red-500 hover:bg-red-600 duration-200 px-4 py-2 w-full rounded-md">
            <FaSignOutAlt className="inline"/>
            <span>Logout</span> </button>
    </div>
  )
}

export default AdminSidbar
