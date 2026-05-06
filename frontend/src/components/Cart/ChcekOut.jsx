import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCheckout, finalizeCheckOut,payCheckout } from "../../redux/reduxSlices/checkout";

const cartProducts={
    products:[{
        productId:1,
        name:"T-shirt",
        size:"M",
        color:"red",
        quantity:1,
        price:255,
        image:"https://picsum.photos/200?random=1"
    },
    {
        productId:2,
        name:"Jeans",
        size:"L",
        color:"Blue",
        quantity:1,
        price:150,
        image:"https://picsum.photos/200?random=2"
    },
],
totalPrice:1450
}
const ChcekOut = () => {
  const navigate=useNavigate()
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
        });
    const [checkId,setCheckId]=useState("123");
    const {cart,loading,error}=useSelector(state=>state.cart);
    const {user,guestId}=useSelector(state=>state.auth);
    const dispatch=useDispatch();
  useEffect(()=>{

    if(!cart||!cart.products||cart.products.length==0)
      navigate('/');
  },[cart,navigate]);

  async function handelCreateCheckout(e){
    e.preventDefault()

    if(cart&&cart.products.length>0){
      try{
    const res= 
    await dispatch(createCheckout({
      checkoutItems:cart.products,
      shippingAddress,
      paymentMethod:'Paypal',
      totalPrice:cart.totalPrice}));
      if(res.payload&&res.payload.checkout._id){
      setCheckId(res.payload?.checkout._id); 
      }
    }
    catch(error){
    console.log(error);  
  }
}
}
async function handelPaymentSuccess(details){
  try{
    const res=await dispatch(payCheckout(
      {paymentDetails:details,paymentStatus:'paid',id:checkId}))
      if(res.payload.status==200){
      const secondResponse=await dispatch(finalizeCheckOut(checkId));
        if(secondResponse.payload.status==200){
          navigate('/order-confirmation')
        }
          
      }

  }catch(error){
    console.log(error);
  }
}
  if(loading)
  return <div className="flex flex-grow justify-center items-center min-h-[400px] space-x-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            </div>
  if(error){
    return <div className="h-[600px] flex justify-center items-center">
      <p className="text-center text-xl font-semibold">Error:{error}</p>
    </div>
  } 
  if(!cart||!cart.products)
    return <div className="h-[600px] flex justify-center items-center">
     <p className="text-center text-xl font-semibold">Your Cart is Empty.</p> 
       </div>
  return (
    <div className="max-w-5xl mx-auto py-6 px-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT - DIV  */}
      <div className="bg-white"> 
        <h2 className="text-xl  font-medium uppercase mb-4">CheckOut</h2>
        <form onSubmit={handelCreateCheckout}>
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
            <input type="text" 
            className=" w-full px-2 py-1 rounded border "
            value={shippingAddress.firstName}
            onChange={(e)=>
                setShippingAddress({...shippingAddress,firstName:e.target.value})}
             required />
            </div>
             <div className="w-1/2">
            <label className="text-sm block text-gray-700 ">Last Name</label>
            <input type="text" 
            className=" w-full px-2 py-1 rounded border"
            value={shippingAddress.lastName}
            onChange={(e)=>
                setShippingAddress({...shippingAddress,lastName:e.target.value})}
              required/>
            </div>
        </div>
        <div className="mb-4">
            <label className="text-sm block text-gray-700 ">Address</label>
            <input type="text" 
            className=" w-full px-2 py-1 rounded border "
            value={shippingAddress.address}
            onChange={(e)=>
                setShippingAddress({...shippingAddress,address:e.target.value})}
              required/>
            </div>
         <div className="flex gap-4 mb-4">
            <div className="w-1/2">
            <label className="text-sm block text-gray-700 ">City</label>
            <input type="text" 
            className=" w-full px-2 py-1 rounded border "
                  value={shippingAddress.city}
            onChange={(e)=>
                setShippingAddress({...shippingAddress,city:e.target.value})}
              required/>
            </div>
             <div className="w-1/2">
            <label className="text-sm block text-gray-700 ">Postal Code</label>
            <input type="text" 
            className=" w-full px-2 py-1 rounded border "
                  value={shippingAddress.postalCode}
            onChange={(e)=>
                setShippingAddress({...shippingAddress,postalCode:e.target.value})}
              required/>
            </div>
        </div>
      
         <div className="mb-4">
            <label className="text-sm block text-gray-700 ">Country</label>
            <input type="text" 
            className=" w-full px-2 py-1 rounded-lg border "
            value={shippingAddress.country}
            onChange={(e)=>setShippingAddress({...shippingAddress,country:e.target.value})}
              />
        </div>
         <div className="mb-4">
            <label className="text-sm block text-gray-700 ">Phone</label>
            <input type="tel" 
            className=" w-full px-2 py-1 rounded-lg border "
            value={shippingAddress.phone}
            onChange={(e)=>setShippingAddress({...shippingAddress,phone:e.target.value})}
              />
        </div>
           <div className="mt-6">
           {checkId?( 
            <button  type="submit" className="w-full bg-black text-white rounded p-3">
                Continue to Payment
             </button>):(<div>
              <h3>Pay with Paypal</h3>
              {/* PayPal COMPONENT  */}
             </div>)}
           </div>
        </form>
         <button onClick={()=>handelPaymentSuccess("we did pay the checkout")} 
         className="w-full bg-black text-white rounded p-3 mt-10">
                Continue to Payment............
             </button>
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
