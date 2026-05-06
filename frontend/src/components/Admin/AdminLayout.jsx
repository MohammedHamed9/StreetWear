import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom"

import AdminSidbar from "./AdminSidbar";

const AdminLayout = () => {
    const [isOpen,setIsOpen]=useState(false );
    function toggleIsOpen(){
      return setIsOpen(!isOpen)
    }
  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile */}
      <div className="bg-gray-900 p-4 flex items-center justify-start gap-4 md:hidden text-gray-100 ">
      <button onClick={toggleIsOpen}><FaBars size={24}/></button>
      <h1 className="text-xl font-medium">Admin Dashboard</h1>
      </div>
        {/* overlay div */}
        {isOpen&&(
          <div onClick={toggleIsOpen} 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden">
          </div>
        )}

       {/* LEFT DIV */}
        <div className={`w-64 h-screen  bg-gray-900 p-6 text-gray-100
       fixed z-20 md:sticky top-0 transform
        ${isOpen?"translate-x-0":"-translate-x-full"} 
        transition-transform duration-300  md:translate-x-0 md:static md:block `}>
        <AdminSidbar/>
      </div>  
    {/* RIGHT DIV */}
       <div className="flex-grow p-6 overflow-auto">
        <Outlet/>
      </div> 
    </div>
  )
}

export default AdminLayout
