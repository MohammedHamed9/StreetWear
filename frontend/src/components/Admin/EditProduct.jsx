import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "../../redux/reduxSlices/product";
import { useParams } from "react-router-dom";
import { updateProduct } from "../../redux/reduxSlices/adminProdcuts";
import{useForm}from "react-hook-form"

export default function EditProduct() {
  const [productData, setProductData] = useState(null);
  const {productId}=useParams();
  const [formErrors,setFormErrors]=useState({});
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
  let oldvariants=[...productData.variants]
  //oldvariants[index][feild]=feild=='stock'?Number(value):value.trim();

  oldvariants[index] = { 
    ...oldvariants[index], 
    [feild]: feild === 'stock' ? Number(value) : value 
  };
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
//Normal fields 
const fieldsToSend = [
    "name", "admin_created_id", "collections", "description", 
    "discountPrice", "price", "fit", "gender", "isFeatured", 
    "isPublished", "material", "numReviews", "rating", "sku"
  ];
  fieldsToSend.forEach(field => {
    if (productData[field] !== undefined && productData[field] !== null) {
      formDate.append(field, productData[field]);
    }
  });
  
  const jsonFields = ["variants", "category", "brand", "tags", "images"];
  jsonFields.forEach(field => {
    if (productData[field]) {
      formDate.append(field, JSON.stringify(productData[field]));
    }
  });
  if(productData.newImages){  productData.newImages.forEach(image => {
    if(image instanceof File)
    formDate.append('images',image);
  });}
  try{
 await dispatch(updateProduct({id:productId ,productData:formDate})).unwrap();
  dispatch(fetchProductDetails(productId));

  }catch(error){
    console.log(error);
    const backendErrors={};
    if(error.errors){
      error.errors.forEach((err)=>{
        backendErrors[err.field]=err.message;
      })
      setFormErrors(backendErrors);
    }
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
        {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Description:</label> 
        <textarea name="description" 
        value={productData.description}
        onChange={handelChange}
        className="border border-gray-300 p-2 w-full rounded-md"
         rows={4} 
         required />
        {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Price:</label> 
        <input type="number" name="price" 
        value={productData.price} 
        onChange={handelChange}
        className="w-full rounded-md border border-gray-300 p-2 " required />
      {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">discountPrice:</label> 
        <input type="number" name="discountPrice" 
        value={productData.discountPrice} 
        onChange={handelChange}
        className="w-full rounded-md border border-gray-300 p-2 " required />
      {formErrors.discountPrice && <p className="text-red-500 text-sm">{formErrors.discountPrice}</p>}
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
           {formErrors.gender && <p className="text-red-500 text-sm">{formErrors.gender}</p>}
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
      {formErrors.category && <p className="text-red-500 text-sm">{formErrors.category}</p>}
      {formErrors.brand && <p className="text-red-500 text-sm">{formErrors.brand}</p>}
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">SKU</label> 
        <input type="text" name="sku" 
        value={productData.sku} 
        onChange={handelChange}
        className="w-full rounded-md border border-gray-300 p-2 " />
        {formErrors.sku && <p className="text-red-500 text-sm">{formErrors.sku}</p>}
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
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S" >S</option>
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
      {formErrors[`variants.${index}.color`] &&(
        <p className="text-red-500 text-sm ">{formErrors[`variants.${index}.color`]}</p>
        )}
      {formErrors[`variants.${index}.size`] &&(
        <p className="text-red-500 text-sm ">{formErrors[`variants.${index}.size`]}</p>)}
      {formErrors[`variants.${index}.stock`] &&(
        <p className="text-red-500 text-sm ">{formErrors[`variants.${index}.stock`]}</p>)}

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
