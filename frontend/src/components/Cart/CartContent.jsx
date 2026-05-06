import { useEffect } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
    import { removeProduct,updateProductQuantity } from "../../redux/reduxSlices/cart";

const CartContent = ({cart,userId,guestId}) => {
const {loading,error}=useSelector(state=>state.cart);
  const dispatch=useDispatch();


   function handelAddToCart({productId,quantity,delta,size,color}){
    let newQuantity=quantity+delta;
        dispatch(
    updateProductQuantity(
        {productId,quantity:newQuantity,size,color,userId,guestId}))
    }

    function handelremoveProduct({productId,size,color}){
        dispatch(removeProduct({productId,size,color,userId,guestId}))
    }
  return (
    <div>
        {cart.products.map((product,index) => (
            <div key={index}
             className="flex items-start justify-between border-b py-4 pr-5">
                <div className="flex ">
                <img src={product.image} alt={product.name} 
                className="w-20 h-24 object-cover mx-4 rounded " />
                <div>
                    <h3>{product.name}</h3>
                    <p className="text-sm text-gray-500">
                        size: {product.size} | color: {product.color}</p>
                 <div className="flex items-center mt-3">
                    <button onClick={()=>handelAddToCart({
                        productId:product.productId,
                        quantity:product.quantity,
                        delta:-1,
                       size: product.size,
                       color: product.color
                    })}
                     className="border rounded px-2 py-1 text-xl font-medium ">
                        -</button>
                    <span className="mx-4">{product.quantity}</span>
                    <button onClick={()=>handelAddToCart({
                        productId:product.productId,
                        quantity:product.quantity,
                        delta:1,
                       size: product.size,
                       color: product.color
                    })}
                    className="border rounded px-2 py-1 text-xl font-medium ">
                        +</button>
                </div>
                </div>
               
                </div>
               <div className="flex flex-col items-end gap-2">
                <p className="font-medium">${product.price.toLocaleString()}</p>
                <button onClick={()=>handelremoveProduct({
                        productId:product.productId,
                        size:product.size,
                        color:product.color})}
                 className="text-red-600  flex items-center justify-center">
                   <RiDeleteBin3Line className="size-6"/></button>
               </div>
            </div>
        ))}
    </div>
);
}

export default CartContent
