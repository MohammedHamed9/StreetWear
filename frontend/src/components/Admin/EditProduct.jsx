import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/reduxSlices/product";
import { useParams } from "react-router-dom";
import { updateProduct } from "../../redux/reduxSlices/adminProdcuts";

export default function EditProduct() {
const [productData, setProductData] = useState(null);
const {productId}=useParams();
const {selectedProduct,loading,error}=
  useSelector(state=>state.product);
  const dispatch=useDispatch();
  useEffect(()=>{
      dispatch(fetchProductDetails(productId));
  },[dispatch,productId]);
useEffect(() => {
    if (selectedProduct) {
        setProductData(selectedProduct);
    }
}, [selectedProduct]);
function handelChange(e){
  const {name,value}=e.target
  setProductData({...productData,[name]:value});
    

}

function handelAddNewVariants(e){
    e.preventDefault()

  setProductData({
    ...productData,
    variants:[...productData.variants,{color:"",size:"",stock:""}]
  })
     

}
function handelVariantsChange(index,feild,value){
  const oldvariants=[...productData.variants]
  oldvariants[index][feild]=feild=='stock'?Number(value):value.trim();
  setProductData({...productData,variants:oldvariants})
  

}
function handelRemoveVariant(e,index){
  e.preventDefault();
  const oldVariant=[...productData.variants]
  let newVariant=oldVariant.filter((_,i)=>i!=index);
  setProductData({...productData,variants:newVariant});
}
function handelImageUpload(e){
  const files=Array.from(e.target.files) 

  setProductData(prevData=>(
    {...prevData,newImages:[...(prevData.newImages||[]),...files]}
  )
     )
}
async function handelSubmit(e){
  e.preventDefault()
  const formDate=new FormData()
  formDate.append("name",productData.name)
  formDate.append("admin_created_id",productData.admin_created_id)
  formDate.append("collections",productData.collections)
  formDate.append("description",productData.description)
  formDate.append("discountPrice",productData.discountPrice)
  formDate.append("price",productData.price)
  formDate.append("fit",productData.fit)
  formDate.append("gender",productData.gender)
  formDate.append("isFeatured",productData.isFeatured)
  formDate.append("isPublished",productData.isPublished)
  formDate.append("material",productData.material)
  formDate.append("numReviews",productData.numReviews)
  formDate.append("rating",productData.rating)
  formDate.append("sku",productData.sku)
  formDate.append("variants",JSON.stringify(productData.variants));
  formDate.append("category",JSON.stringify(productData.category));
  formDate.append("brand",JSON.stringify(productData.brand));
  formDate.append("tags",JSON.stringify(productData.tags));
  formDate.append("images",JSON.stringify(productData.images));
  if(productData.newImages){  productData.newImages.forEach(image => {
    if(image instanceof File)
    formDate.append('images',image);
  });}
  try{
 await dispatch(updateProduct({id:productId ,productData:formDate})).unwrap();
  dispatch(fetchProductDetails(productId));

  }catch(error){
    console.log(error);
  }
}
if(error)
  return(<div className="text-center h-[600px] flex items-center justify-center ">
    <p className="text-xl font-semibold">Error:{error }</p>
  </div>)
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md">
    <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
    {loading?(
      <div className="flex flex-grow justify-center items-center min-h-[600px] space-x-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            
            </div>
    ):
    selectedProduct&&productData?(
      <form onSubmit={handelSubmit}>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Product Name:</label> 
        <input type="text" name="name" 
        value={productData.name} 
        onChange={handelChange}
        className="w-full rounded-md border border-gray-300 p-2 " required />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Description:</label> 
        <textarea name="description" 
        value={productData.description}
        onChange={handelChange}
        className="border border-gray-300 p-2 w-full rounded-md"
         rows={4} 
         required />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Price:</label> 
        <input type="number" name="price" 
        value={productData.price} 
        onChange={handelChange}
        className="w-full rounded-md border border-gray-300 p-2 " required />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Gender:</label> 
         <select name="gender"  value={productData.gender}
            onChange={handelChange}
            className="w-1/2 px-2 py-2.5 rounded-md border">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="UniSex">UniSex</option>
           </select>
      </div>

      <div className="mb-6 flex gap-4 items-center">
      <label className="block font-semibold mb-2">Category:</label>
      <input type="text" name="category" 
      className="w-1/4 rounded-md p-2 border border-gray-300"
      value={productData.category.name}
      onChange={handelChange} />

      <label className="block font-semibold mb-2">Brand:</label>
      <input type="text" name="brand" 
      className="w-1/4 rounded-md p-2 border border-gray-300"
      value={productData.brand.name}
      onChange={handelChange} />
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">SKU</label> 
        <input type="text" name="sku" 
        value={productData.sku} 
        onChange={handelChange}
        className="w-full rounded-md border border-gray-300 p-2 " />
      </div>

      <div className="mb-6">
      <label className="block font-semibold mb-2">Variants:</label> 
      
      {productData.variants.map((variant,index)=>(
        <div key={index} className="flex gap-4 mb-3 items-center">
        
         {/* COLOR */}
          <input type="text" name="color"
          value={variant.color}
          onChange={(e)=>handelVariantsChange(index,"color",e.target.value)}
           className="w-2/5 p-2 rounded-md border" 
          />
          {/* SIZE */}
           <select  value={variant.size}
            onChange={(e)=>handelVariantsChange(index,"size",e.target.value)}
            className="w-1/5 px-2 py-2.5 rounded-md border">
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XLL</option>
           </select>
           {/* IN STOCK */}
          <input type="number" name="stock" 
          placeholder="Stock"
          value={variant.stock}
          onChange={(e)=>handelVariantsChange(index,"stock",e.target.value)}
          className="w-1/5 p-2 rounded-md border" />
      <button onClick={(e)=>handelRemoveVariant(e,index)}
       className=" text-white text-sm
       bg-red-500 hover:bg-red-700 transition-colors 
       px-2 py-1 lg:px-4 lg:py-2 rounded-lg
      ">Remove Variant</button>
        </div>
      ))
      }
    <button onClick={handelAddNewVariants}
    className="mt-2 bg-gray-800 text-white 
    px-4 py-2 rounded-md text-sm"> + Add Variant </button>
    </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Upload Image:</label> 
        <input type="file"  name="images"  multiple
        onChange={handelImageUpload}
         />
         <div className="flex gap-4 mt-4">
          {productData.images.map((image,index)=>(
            <div key={index}>
              <img src={image.url} alt="product image"
              className="w-20 h-20 object-cover rounded-md" />
            </div>
          ))}
         </div>
      </div>
           <button type="submit"
          className="w-full rounded-md mx-auto py-2 px-4 text-white bg-green-500 hover:bg-green-600 
          transition-colors">
            Upload Product</button> 
    </form>
    ):(
      <div className="text-center h-[600px] flex items-center justify-center ">
    <p className="text-xl font-semibold">Error:{error}</p>
  </div>
    )
    }
    </div>
  )
}
