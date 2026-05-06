import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsWithFilters } from "../../redux/reduxSlices/product";
import { deleteProduct, getAllProducts } from "../../redux/reduxSlices/adminProdcuts";


const ProductManagment = () => {
  const {products,loading,error}=useSelector(state=>state.adminProduct);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getAllProducts());
  },[dispatch]);

    function handelDeleteProduct(prodcutsId){
      if(window.confirm("Are you sure you want to delete this product?"))
       dispatch(deleteProduct(prodcutsId))
    }
    if(error)
  return(<div className="text-center h-[600px] flex items-center justify-center ">
    <p className="text-xl font-semibold">Error:{error }</p>
  </div>)
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Product Manamnet</h1>

      <div className="mt-6 overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full text-left text-gray-500">
        <thead className="text-gray-700 text-sm uppercase bg-gray-100">
            <tr>
            <th className="py-3 px-4 w-1/4 ">Name</th>
            <th className="py-3 px-4 w-auto sm:w-2/5">Sizes</th>
            <th className="py-3 px-4 ">price</th>
            <th className="py-3 px-4 ">sku</th>
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
           products.length>0?( products.map((product)=>(
                <tr key={product} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-900 whitespace-nowrap
                     font-medium">{product.name}</td>
                    {
                      product.variants&&product.variants.length>0?(
                       <td className="p-4">

                       <div className="flex sm:flex-wrap gap-x-2 gap-y-4 ">
                        { product.variants.map((variant,index)=>(
                         <p key={index} 
                         className="bg-gray-200 text-gray-800
                          text-sm px-2 py-1 rounded
                         border border-gray-300"> {variant.color}:{" "}
                          {variant.size}{" "}({variant.stock}) </p>
                        ))}
                        
                       </div>
                         </td>
                      ):(
                        <td className=" text-gray-500">
                          no sizes
                        </td>
                      )
                      }
                    <td className="p-4 ">${product.price}</td>
                    <td className="p-4 ">{product.sku}</td>
                    <td className="p-4  ">
                        <div className="flex items-center">
                          <Link to={`/admin/products/${product._id}/edit`}
                         className="py-1.5 px-2 rounded text-white
                         bg-yellow-500 hover:bg-yellow-600 mr-2">Edit</Link>
                        
                        <button onClick={()=>handelDeleteProduct(product._id)}
                         className="py-1 px-2 rounded text-white
                         bg-red-500 hover:bg-red-600">Delete</button>
                        </div>
                    </td>
                </tr>
            ))
        ):(
                <tr> 
                  <td colSpan={4}
                 className="text-center text-gray-500">no products found</td>
                 </tr>
            )}
        </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductManagment
