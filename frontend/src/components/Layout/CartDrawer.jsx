import { useRef, useState } from "react"
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/reduxSlices/cart";
import { useEffect } from "react";

const CartDrawer = ({drawerOpen,setDrawerOpen}) => {
  const {user,guestId}=useSelector(state=>state.auth);
  const { cart,loading, error}=useSelector(state=>state.cart);
  const userId=user?.id;
  const navigate=useNavigate()
  const dispatch=useDispatch();
const drawer = useRef();useEffect(()=>{
  if(userId|| guestId)
    dispatch(fetchCart({userId,guestId}));
},[dispatch,user?.id,guestId,navigate]);

useEffect(()=>{
function handelClick(e){
if(drawer.current && ! drawer.current.contains(e.target))
  setDrawerOpen(false);
}
document.addEventListener("mousedown",handelClick);

return ()=>document.removeEventListener("mousedown",handelClick)

},[])

  async function handelCheckout(){
    setDrawerOpen(false)
    if(!user)
      return navigate("/login?redirect=checkout")

    navigate("/checkout")
  }
  return (
    <div ref={drawer} className={`w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white
    fixed top-0 right-0 z-50 transform transition-transform duration-300
    ${drawerOpen?"translate-x-0":"translate-x-full"} flex flex-col`}>
      {/* close -button  */}
      <div className="flex justify-end p-4">
        <button onClick={()=>setDrawerOpen(false)}>
            <IoMdClose className="size-6 text-gray-600 hover:text-black"/>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto ">
        <h2 className="text-xl font-semibold mb-4 ml-3">Your Cart</h2>
        {/*cart content*/ }
       
       {
        cart?.products.length>0? (
           <CartContent cart={cart} userId={userId} guestId={guestId} />
        )
        :(
          <p className="text-lg font-semibold text-center mt-14">Your cart is empty.</p>
        )
       }

      </div>
      {/* fixed button at the end */}
      {
        cart?.products?.length>0?(
          <div className="p-4 sticky bottom-0">
        <button onClick={handelCheckout} 
        className="w-full bg-black text-white rounded-lg py-3
         hover:bg-gray-800 transition font-semibold">Checkout</button>
        <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center mb-2">Shipping, taxes, and discount codes calculated at checkout.</p>
      </div>
        ):(<p className="text-sm tracking-tighter text-gray-500 mt-2 text-center mb-2">
          Shipping, taxes, and discount codes calculated at checkout.</p>
)
      }
      
    </div>
  )
}

export default CartDrawer
