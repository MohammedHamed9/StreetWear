import heroImg from"../../assets/hero.webp"
import { Link } from "react-router-dom"
const Hero = () => {
  return (
    <div className="relative">
      <img src={heroImg} alt="" className="w-full h-[400px] md:h-[600px] lg:h-[650px]  object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-30 text-white flex justify-center items-center">
       <div className=" text-center ">
         <h1 className="text-4xl md:text-9xl tracking-tighter font-bold uppercase mb-4">vaction <br /> ready</h1>
        <p className="text-sm md:text-lg tracking-tighter mb-4">Explore our vaction-ready outfits with fast worldwid shipping</p>
        <Link to="#" className="bg-white text-black px-6 py-2 rounded-sm text-lg">Shop Now</Link>
       </div>
      </div>
    </div>
  )
}

export default Hero
