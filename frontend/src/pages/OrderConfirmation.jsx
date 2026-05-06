import { useSelector } from "react-redux";
function calcEstimatedDelivary(createdAt){
    const date=new Date(createdAt);
    date.setDate(date.getDate()+10)
    return date.toLocaleDateString();
  }
const OrderConfirmation = () => {
  const {checkout,loading,error}=useSelector(state=>state.checkout)
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
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-emerald-700 mb-8 text-center">Thank You for Your Order!</h1>
        {checkout&&(
          <div className="bg-white p-6 border rounded-lg">
          <div className="flex  justify-between gap-4">
          <div>
          <h2 className="font-semibold text-xl">Order ID: {checkout._id}</h2>
          <p className="text-gray-500 whitespace-nowrap">Order date: {checkout?.createdAt&& new Date(checkout.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-emerald-700">Estimated Delivary:{calcEstimatedDelivary(checkout.createdAt)}</p>
          </div>
            </div>
          {/* ORDER ITEMS */}
          <div className="mt-20">
        {checkout.checkoutItems.map((item)=>(
              <div key={item}  className="mb-4 flex items-start justify-between ">
                <div className="flex items-start gap-3">
                <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-sm"/>
                <div>
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.color} | {item.size}  </p>
                </div>
                </div>
                <div>
                <p className="text-md">${item.price?.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Qty:{item.quantity}</p>
                </div>
              </div>
            ))}

          </div>
          {/* PAYMENT AND DELAVIRY INFO */}
          <div className="mt-10 grid grid-cols-2 ">
            <div className="">
            <h2 className="font-semibold text-lg mb-2">Payment</h2>
            <p className=" text-gray-600">Paymal</p>
          </div>
            <div className="">
            <h2 className="font-semibold text-lg mb-2">Delivery</h2>
            <p className=" text-gray-600">{checkout.shippingAddress.address}</p>
            <p className=" text-gray-600">{checkout.shippingAddress.city}, {" "}
              {checkout.shippingAddress.country}
            </p>
          </div>
          </div>
         
           </div>
        )}
   
    </div>
  )
}

export default OrderConfirmation
