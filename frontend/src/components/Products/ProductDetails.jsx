import { useEffect, useState } from "react";
import {toast} from "sonner";
import ProductGrid from "./ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/reduxSlices/product";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/reduxSlices/cart";

const ProductDetails = ({productId}) => {
  const {id}=useParams();
  const {selectedProduct,similarProducts,loading,error}
  =useSelector(state=>state.product);
  const {loading:cartLoading,error:cartError}=useSelector(state=>state.cart);
  const{user,guestId}=useSelector(state=>state.auth)
  const [mainImage,setMainImage]=useState("");
  const [selectedColor,setSelectedColor]=useState("");
  const [selectedSize,setSelectedSize]=useState("");
  const [selectedQuantity,setSelectedQuantity]=useState(1); 
  const [addingButtom,setAddingButtom]=useState(false)
  
  const dispatch=useDispatch();
  const fetchedId=productId||id;
  useEffect(()=>{
  if(fetchedId){
    dispatch(fetchProductDetails(fetchedId));
    dispatch(fetchSimilarProducts(fetchedId));
  }
  },[dispatch,fetchedId])
  
  useEffect(()=>{
    if(selectedProduct?.images?.length>0){
      setMainImage(selectedProduct.images[0].url)
    }
  },[selectedProduct])

  async function handelAddProduct(){
    if(!selectedColor || !selectedSize )
     return toast.error("Please select  a color and size before adding to the cart")
    setAddingButtom(true)
    try{
      await dispatch(addToCart({productId:fetchedId,userId:user?.id,guestId,
      color:selectedColor,size:selectedSize,quantity:selectedQuantity}))
      .unwrap()
      setAddingButtom(false);
    }catch(error){
      setAddingButtom(false);
    }
    
  }
  if(error){
    return <p className="text-center font-semibold text-xl">Error:{error}</p>
  }
  return (
    <section className="py-5">
    {/* CONTAINER */}
    <div className=" max-w-6xl mx-auto flex flex-col md:flex-row p-8 md:px-28 px-5">
      {
        loading ?(
           <div className="flex flex-grow justify-center items-center min-h-[400px] space-x-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            </div>
        ):selectedProduct?(<div className=" flex flex-col md:flex-row ">
        {/* Thumbails */}
    <div className="hidden md:flex flex-col gap-2 mr-6">
    {selectedProduct.images.map((produtImages)=>(
        <img 
         onClick={()=> setMainImage(produtImages.url)}
          key={produtImages.url} src={produtImages.url} alt={produtImages.altText}
        className={`w-20 h-20 rounded-lg object-cover cursor-pointer border
          ${mainImage===produtImages.url?"border-black" :"border-gray-300"} `}/>
    ))}
    </div>
    {/* MAIN IMAGE */}
    <div className="">
       <div className="mb-4">
         <img src={mainImage}
         alt={selectedProduct.images[0].altText} 
         className="w-full h-auto  sm:h-[480px] object-cover rounded-lg"/>
       </div>
    </div>
    {/* Thumbails on Mobils */}
    <div className="flex md:hidden gap-4 overflow-x-scroll mb-4">
        {selectedProduct.images.map((produtImages)=>(
        <img onClick={()=> setMainImage(produtImages.url)}
         key={`mob-${produtImages.url}`} src={produtImages.url} alt={produtImages.altText}
         className={`w-20 h-20 rounded-lg object-cover cursor-pointer border
          ${mainImage===produtImages.url?"border-black" :"border-gray-300"} `}/>
    ))}
    </div>
    {/* text - section  */}
    <div className="md:w-1/2 md:ml-10">

    <h1 className=" text-lg md:text-2xl  font-semibold ">{selectedProduct.name}</h1>
 <div className="flex gap-4 md:inline-block ">   
  <p className="text-gray-600 text-md md:text-lg  mb-1 line-through">
        $ {selectedProduct.price&&selectedProduct.price}
    </p>
    <p className="text-gray-500 text-md md:text-lg mb-2">
      $ {selectedProduct.discountPrice}</p>
</div>
    <p className="text-gray-600  mb-3" >{selectedProduct.description}</p>

    <p className=" text-sm text-gray-700 mb-1 ">Color:</p>
    <div className="flex gap-2 mb-3">
      {selectedProduct.colors.map((color)=>(
      <button key={color} onClick={()=>setSelectedColor(color)} 
      className={`w-6 h-6 brightness-50 rounded-full
       ${selectedColor===color?"border-black border-4  ":""}`}
       style={{background:color.toLocaleLowerCase()}}></button>
      ))}
       </div>
    
  <div className="mb-4">
      <p className=" text-sm text-gray-700 ">Size:</p>
    <div className="flex gap-2 mb-2">
        {selectedProduct.sizes.map((size)=>(
        <button key={size} onClick={()=>setSelectedSize(size)} 
        className={`w-8 h-8 text-center rounded border border-gray-400 flex items-center justify-center
          ${selectedSize===size?"bg-black text-white":""}`}><span>{size}</span></button>
        ))}
    </div>

  </div>
    <div>
      <p className=" text-sm text-gray-700  mb-1">Quantity:</p>
    <div className="flex gap-4 items-center mb-6">
       <button onClick={()=>setSelectedQuantity((quaintity)=> quaintity==1?quaintity: quaintity-1)} className="px-2 py-1 bg-gray-300 ">-</button>
       <span className="text-lg">{selectedQuantity}</span>
       <button onClick={()=>setSelectedQuantity((quaintity)=>quaintity+1)} className="px-2 py-1 bg-gray-200 rounded text-lg ">+</button>
    </div>
    </div>
    <button onClick={handelAddProduct} disabled={cartLoading}
     className={`w-full bg-black  text-white text-xs py-2 px-6 rounded mb-4
      ${cartLoading?"bg-opacity-50":"hover:bg-gray-800"}`}>
      {cartLoading?"Adding...":"ADD TO CART"}</button>
     
     <div className="mt-10">
      <p className="text-lg text-gray-800 font-medium mb-4">Characterstics:</p>
     <div className="flex justify-start gap-20">
       <div className="flex flex-col gap-2 text-gray-700">
        <span>Brand</span>
        <span>{selectedProduct.brand.name}</span>
         </div>
      <div className="flex flex-col gap-2  text-gray-700"> 
        <span>Material</span>
        <span>{selectedProduct.material}</span>
     </div>
      </div>
      </div>   
    </div> 
</div>):(
  <p className="text-center text-xl font-semibold">Product Not Found!</p>
)
      }
    
    </div>
    {/* YOU MAY ALSO LIKE SECTION */}
    <h1 className=" mt-10 text-center text-gray-800 text-2xl font-medium">You May Also Like</h1>
    <div className="max-w-6xl mx-auto px-8 md:px-28 mt-10">
      { <ProductGrid products={similarProducts} loading={loading} error={error}/> }
    </div>
    </section>
  )
}

export default ProductDetails
