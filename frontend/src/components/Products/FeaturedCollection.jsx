import { Link } from 'react-router-dom'
import featuredImage from '../../assets/featured.webp'
const FeaturedCollection = () => {
  return (
    <div className="container mx-auto px-12 py-12 mt-16 ">
      <div className="flex flex-col-reverse lg:flex-row">
        <div className='bg-green-50 p-8 flex-1 
        flex flex-col items-center lg:items-start justify-center text-center lg:text-left'>
            <h2 className='text-gray-700 text-lg font-semibold mb-2'>Comfort and Style</h2>
            <p className='text-4xl  lg:text-5xl  font-bold mb-6'>Apparel made for your <br /> everyday life</p>
            <p className='text-gray-600 text-lg mb-4'>Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.</p>
        <Link to="/collections/all" className="bg-black text-white px-6 py-3 rounded-lg text-lg">Shop Now</Link>
        </div>
        <div className='flex-1'>
            <img src={featuredImage} alt="" className='w-full h-full object-cover rounded-t-3xl lg:rounded-r-3xl '/>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCollection
