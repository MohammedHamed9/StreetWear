import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createUser, deleteUser, getAllUser, updateUser } from "../../redux/reduxSlices/admin";
import { useNavigate } from "react-router-dom";


const UserManagment = () => {
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:"customer"
    });
    const navigate=useNavigate()
      const {users,loading,error}=useSelector(state=>state.admin);
      const {user}=useSelector(state=>state.auth);
      useEffect(()=>{
        if(user && user.role!=='Admin')
            navigate('/')
      },[user,navigate])
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getAllUser());
  },[dispatch]);

    function handelChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    function handelSubmit(e){
        e.preventDefault();
        dispatch(createUser(formData))
        setFormData({
        name:"",
        email:"",
         password:"",
        role:"customer"
    })
    }
    function handeChangeRole(userId,role){
        dispatch(updateUser({id:userId,userData:{role}}))
    }
    function handelDeleteUser(useId){
      if(window.confirm("Are you sure you want to delete this user?"))
          dispatch(deleteUser(useId))
    }
  return (
    <div className="max-w-7xl  mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Managment</h1>
      <div className="p-6 ">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handelSubmit}>
            <div className=" mb-4">
                <label className="block text-gray-700 font-medium">Name</label>
                <input type="text" name="name" 
                className="border p-2 rounded w-full"
                value={formData.name} onChange={handelChange}
                required/>
            </div>
             <div className=" mb-4">
                <label className="block text-gray-700 font-medium">Email</label>
                <input type="email" name="email" 
                className="border p-2 rounded w-full"
                value={formData.email} onChange={handelChange}
                required/>
            </div>
            <div className=" mb-4">
                <label className="block text-gray-700 font-medium">Password</label>
                <input type="password" name="password" 
                className="border p-2 rounded w-full"
                value={formData.password} onChange={handelChange}
                required/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Role</label>
                <select name="role" value={formData.role}
                onChange={handelChange}
                className="rounded border p-2 w-full"> 
                    <option value="Customer" >Customer</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <button type="submit"
            className="py-2 px-4 rounded-lg
             bg-green-500 hover:bg-green-600 text-white">
                Add User</button>
        </form>
      </div>
    
      <div className="mt-6 overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left text-gray-500">
        <thead className="text-gray-700 text-sm uppercase bg-gray-100">
            <tr>
            <th className="py-3 px-4 ">Name</th>
            <th className="py-3 px-4 ">email</th>
            <th className="py-3 px-4 ">role</th>
            <th className="py-3 px-4 ">actions</th>
            </tr>
        </thead>
        <tbody>
            {loading?(
            <tr>
            <td colSpan={5}
            className="text-center text-lg text-gray-500 p-4">Loading...</td>
            </tr>
            
           ):
            users.map((user)=>(
                <tr key={user} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-900 whitespace-nowrap
                     font-medium">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                        <select name="role" value={user.role}
                         onChange={(e)=>handeChangeRole(user._id,e.target.value)}
                         className="p-2 border rounded">
                        <option value="Customer">Customer</option>  
                        <option value="Admin">Admin</option>    
                        </select>
                    </td>
                    <td>
                        <button onClick={()=>handelDeleteUser(user._id)}
                         className="py-2 px-4 rounded text-white
                         bg-red-500 hover:bg-red-600">Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagment
