import {HiShoppingBag} from 'react-icons/hi'
import { HiArrowPath } from "react-icons/hi2";
import { MdOutlineCreditCard } from "react-icons/md";
const FeaturedSection = () => {
  return (
    <div className="container mx-auto px-28 py-10 mt-10 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
      <div className="flex flex-col items-center justify-center">
        <HiShoppingBag className='mb-6 text-xl'/>
        <h2 className='tracking-tighter font-semibold text-gray-900 mb-2'>FREE INTERNATIONAL SHIPPING</h2>
        <p className='text-gray-600 text-sm tracking-tight'>On all orders over $100.00</p>
      </div>
        <div className="flex flex-col items-center justify-center">
        <HiArrowPath className='mb-6 size-5'/>
        <h2 className='font-semibold text-gray-900 mb-2'>45 DAYS RETURN</h2>
        <p className='text-gray-600'>Money back guarantee</p>
      </div>
        <div className="flex flex-col items-center justify-center">
        <MdOutlineCreditCard className='mb-6 size-5'/>
        <h2 className='tracking-tighter font-semibold text-gray-900 mb-2'>SECURE CHECKOUT</h2>
        <p className='text-gray-600 text-sm tracking-tight'>100% secured checkout process</p>
      </div>
    </div>
  )
}

export default FeaturedSection
