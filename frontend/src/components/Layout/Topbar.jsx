import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from'react-icons/io'
import {RiTwitterXLine} from'react-icons/ri'
const Topbar = () => {
    
  return (
    <div className="bg-[#ea2e0e] text-white">
        <div className="container mx-auto px-10 py-4 flex justify-between items-center">
            <div className='md:flex items-center gap-4 hidden'>
                <a href="" className='hover:text-gray-300'><TbBrandMeta className="size-5"/></a>
                <a href="" className='hover:text-gray-300'><IoLogoInstagram className="size-5"/></a>
                <a href="" className='hover:text-gray-300'><RiTwitterXLine className="size-4"/></a>
            </div>
            <div className='text:xs md:text-sm text-center flex-grow'>
                <span>We ship worldwide - Fast and reliable shipping!</span>
                </div>
                {/* البروتوكول تيل علشان لما يدوس عليه ياخده ل الاتصال علي طول */}
            <div className='text-sm text-center hidden md:block'><a href="tel:+1234567890" className='hover:text-gray-300'>
                +1 (234) 567-890</a>
                </div>
        </div>
    </div>
  )
}

export default Topbar
