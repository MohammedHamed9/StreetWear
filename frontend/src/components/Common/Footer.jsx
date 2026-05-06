import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import {FiPhoneCall} from'react-icons/fi'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
      <div className=" border-t border-gray-300 py-12 text-center md:text-left">
      <div className="container mx-auto px-10  grid grid-cols-1 md:grid-cols-4 gap-8">
          <div >
          <h3 className='text-lg text-gray-800 font-medium mb-4'>Newsletter</h3>
          <p className='text-sm text-gray-500 mb-4'>Be the first to hear about new products,
          exclusive events, and online offers.</p>
          <p className='text-sm font-medium  text-gray-600 mb-6' >Sign up and get 10% off on your first oreder.</p>
          <form className='flex'>
              <input type="email"  placeholder="Enter your email"
              className='p-3 w-full text-sm border-t border-l border-b border-gray-300  rounded-l-md 
              focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all' required/>
              <button type='submit' className='bg-black text-white text-sm px-2 py-1 rounded-r-md transition-all  '>Subscribe</button>
          </form>
        </div>
        <div className=''>
          <h3 className='text-lg text-gray-800 font-medium mb-4'>Shop</h3>
          <ul className='space-y-2 text-gray-600'>
            <li ><Link to="#" className='hover:text-gray-500 transition-colors' >Men's  Top Wear</Link></li>
            <li ><Link to="#" className='hover:text-gray-500 transition-colors' >Women's Top Wear</Link></li>
            <li ><Link to="#" className='hover:text-gray-500 transition-colors' >Men's  Bottom Wear</Link></li>
            <li ><Link to="#" className='hover:text-gray-500 transition-colors' >Women's Bottom Wear</Link></li>
          
          </ul>
        </div>

         <div >
          <h3 className='text-lg text-gray-800 font-medium mb-4'>Support</h3>
          <ul className='space-y-2 text-gray-600'>
            <li ><Link to="#" className='hover:text-gray-500 transition-colors' >Contact Us</Link></li>
            <li ><Link to="#" className='hover:text-gray-500 transition-colors' >About Us</Link></li>
            <li ><Link to="#" className='hover:text-gray-500 transition-colors' >FAQs</Link></li>
            <li ><Link to="#" className='hover:text-gray-500 transition-colors' >Features</Link></li>
          
          </ul>
        </div>

        <div >
          <h3 className='text-lg text-gray-800 font-medium mb-4'>Follow Us</h3>
          <div className='flex items-center justify-center md:justify-start gap-3 mb-4'>
          <a href="www.facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-300'><TbBrandMeta className="size-5"/></a>
          <a href="" className='hover:text-gray-300'><IoLogoInstagram className="size-5"/></a>
          <a href="" className='hover:text-gray-300'><RiTwitterXLine className="size-4"/></a>
          </div>
          <div>
            <p>Call Us</p>
            <p> <FiPhoneCall className='inline-block mr-2'/> 0123-456-879</p>
          </div>
        </div>
      </div>
    </div>
    <div className='container mx-auto mt-12 pt-6 border-t border-gray-300'>
    <p className='text-gray-500 tracking-tighter text-center text-sm'> &copy; 2025, CompileTab. All Rights Reserved. </p>    </div>
    </footer>
  )
}

export default Footer
