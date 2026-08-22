import { Link } from "react-router-dom"

const ProductGrid = ({products}) => {
  return (<>
  {
      products?.length==0?(
      <div className="flex flex-col items-center justify-start h-[600px] mt-10">
        <p className="text-xl  font-semibold mb-4">Nothing found.</p>
        <p className="text-lg ">
          Try searching for something else or head back to 
          the shop to see what's new.</p>
      </div>
    ):(
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6" >
    {
    products.map((product)=>(
      <Link key={product._id} to={`/product/${product._id}`}>
         <div className="bg-white p-4 rounded">
            <div className=" w-full h-80 mb-4">
            <img src={product.images[0].url} alt={product.images[0].url}
            className="w-full h-full object-cover rounded" />
            </div>
            <h2 className="mb-2">{product.name}</h2>
            <p className="text-gray-500 font-medium">${product.price}</p>
         </div>
      </Link>
    ))}
    </div>
    )
    
    }
  </>
    
    
  )
}

export default ProductGrid

