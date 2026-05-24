import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout, finalizeCheckOut,payCheckout } from "../../redux/reduxSlices/checkout";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
const ChcekOut = () => {
  const navigate=useNavigate()
  const {register,handleSubmit,formState}=useForm()
  const errors=formState.errors;
  const {cart,loading,error}=useSelector(state=>state.cart);
  const {user,guestId}=useSelector(state=>state.auth);
  const [formLoading,setFormLoading]=useState(false);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(!cart||!cart.products||cart.products.length==0)
      navigate('/');
  },[cart,navigate]);

  async function handelCreateCheckout(data){
    if(cart&&cart.products.length>0){
      try{
        setFormLoading(true);
    const response= 
     await dispatch(createCheckout({
      checkoutItems:cart.products,
      shippingAddress:data,
      paymentMethod:'Stripe',
      totalPrice:cart.totalPrice})).unwrap();
    if(response&&response.checkout&&response.checkout._id){
      const checkoutId=response.checkout._id;
      const res=await axios.post(`${import.meta.env.VITE_API_URL}/streetwear/stripe/create-checkout-session`,
        {cart,checkoutId},{
          headers:{
            Authorization: `Bearer ${ localStorage.getItem("userToken")}`
          }
        });
      if(res.data.url){
      window.location.assign(res.data.url);
      }
    else{
      toast.error("checkout error try again")
    }
    }
  }
    catch(error){
    console.log(error);  
  }finally{
    setFormLoading(false);
  }
}
}

  if(loading)
  return <div className="flex flex-grow justify-center items-center min-h-[400px] space-x-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            </div>
  if(!cart||!cart.products)
    return <div className="h-[600px] flex justify-center items-center">
     <p className="text-center text-xl font-semibold">Your Cart is Empty.</p> 
       </div>
  return (
    <div className="max-w-5xl mx-auto py-6 px-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT - DIV  */}
      <div className="bg-white"> 
        <h2 className="text-xl  font-medium uppercase mb-4">CheckOut</h2>
        
        <form onSubmit={handleSubmit(handelCreateCheckout)}>

        <h3 className="text-lg mb-6">Contact Details</h3>

        <div className="mb-4">
        <label className="text-sm block text-gray-700 ">Email</label>
        <input type="email" value={user?.email||""}
         className=" w-full px-2 py-1 rounded-lg border "
        disabled  />
        </div>

        <h3 className="mb-4 text-lg ">Delivery</h3>

        <div className="flex gap-4 mb-4">
            <div className="w-1/2">
            <label className="text-sm block text-gray-700 ">First Name</label>
            <input type="text" name="firstName"
            className=" w-full px-2 py-1 rounded border "
             required 
             {...register("firstName", { required:"First name is required",minLength:{ value: 3, message: "First name must be at least 3 characters long" } })}/>
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
             <div className="w-1/2">
            <label className="text-sm block text-gray-700 ">Last Name</label>
            <input type="text" name="lastName"
            className=" w-full px-2 py-1 rounded border"
              required
              {...register("lastName", { required: "Last name is required",minLength:{ value: 3, message: "Last name must be at least 3 characters long" } })}/>
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </div>
        </div>
        <div className="mb-4">
            <label className="text-sm block text-gray-700 ">Address</label>
            <input type="text" name="address"
            className=" w-full px-2 py-1 rounded border "
              required
              {...register("address", { required: "Address is required",minLength:{ value: 5, message: "Address must be at least 5 characters long" } })}/>
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>
         <div className="flex gap-4 mb-4">
            <div className="w-1/2">
            <label className="text-sm block text-gray-700 ">City</label>
            <input type="text" name="city"
            className=" w-full px-2 py-1 rounded border "
            {...register("city", { required: "City is required",minLength:{ value: 3, message: "City must be at least 3 characters long" } })}
              required/>
              {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
            </div>
             <div className="w-1/2">
            <label className="text-sm block text-gray-700 ">Postal Code</label>
            <input type="text" name="postalCode"
            className=" w-full px-2 py-1 rounded border "
            {...register("postalCode", { required: "Postal code is required",minLength:{ value: 3, message: "Postal code must be at least 3 characters long" } })}          
              required/>
              {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
            </div>
        </div>
      
         <div className="mb-4">
            <label className="text-sm block text-gray-700 ">Country</label>
            <input type="text" name="country"
            className=" w-full px-2 py-1 rounded-lg border "
            {...register("country", { required: "Country is required",minLength:{ value: 3, message: "Country must be at least 3 characters long" } })}
              />
              {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
        </div>
         <div className="mb-4">
            <label className="text-sm block text-gray-700 ">Phone</label>
            <input type="tel" name="phone"
            className=" w-full px-2 py-1 rounded-lg border "
            {...register("phone", { required: "Phone is required",minLength:{ value: 10, message: "Phone must be at least 10 characters long" } })}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
           <div className="mt-6">
 
            <button  type="submit" disabled={formLoading}
             className={`w-full ${formLoading ? "bg-gray-500" : "bg-black"} text-white rounded p-3`}>
                {formLoading ? "Processing..." : "Continue to Payment"}
             </button>
           </div>
        </form>
      </div>

      {/* RIGHT - DIV */}
      <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-lg mb-4">Order Summary</h2>
          <div className="border-t py-4 mb-2">
            {cart.products.map((product)=>(
              <div key={product._id}  className="py-2 border-b flex items-start justify-between ">
                <div className="flex items-start gap-3">
                <img src={product.image} alt="" className="w-20 h-24 object-cover rounded-sm"/>
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-sm text-gray-500">Size: {product.size}</p>
                  <p className="text-sm text-gray-500">Color: {product.color}</p>
                  <p className="text-sm text-gray-500">quantity: {product.quantity}</p>
                </div>
                </div>
                <p className="text-xl">${product.price?.toLocaleString()}</p>
              </div>
            ))}
          </div>  
          <div className="flex justify-between items-center text-lg mb-4">
            <p>Subtotal</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
          <div className="flex justify-between items-center text-lg">
            <p>Shipping</p>
            <p>Free🤑</p>
          </div>
          <div className="mt-4  py-4 border-t flex  justify-between items-center text-lg">
            <p className="">Total</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
      </div>
    </div>
  )
}

export default ChcekOut
/*
 if(cart&&cart.products.length>0){
      try{
        const response= 
            await dispatch(createCheckout({
              checkoutItems:cart.products,
              shippingAddress:data,
              paymentMethod:'Paypal',
              totalPrice:cart.totalPrice})).unwrap();
      if(response&&response.checkout&&response.checkout._id){
        const res=await axios.post("http://localhost:3000/streetwear/stripe/create-checkout-session",
        {cart},{
          headers:{
            Authorization: `Bearer ${ localStorage.getItem("userToken")}`
          }
        });
        if(res.data.url)
      window.location.href = res.data.url;
    else{
      toast.error("checkout error try again")
    }
      }
    }catch(err){
      console.log(err);
      toast.error("checkout error try again",err);
    }
    }*/