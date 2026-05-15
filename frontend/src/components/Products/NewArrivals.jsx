import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {Link} from "react-router-dom"

const URL='http://localhost:3000'
const VITE_API_URL='https://street-wear-five.vercel.app'

const NewArrivals = () => {
  const scrollRef=useRef();
  const [canScrollLeft,setCanScrollLeft]=useState(true);
  const [canScrollRight,setCanScrollRight]=useState(false);
  const [newArrivals,setNewArrivals]=useState([]);
  useEffect(()=>{
    async function fetchNewArrivals(){
      try{
        const res=await axios.get(`${VITE_API_URL}/streetwear/product/new-arrivals`);
        setNewArrivals(res.data.newArrivals);
      }
      catch(error){
        console.log(error);
      }
    }
    fetchNewArrivals();
  },[]);
  function scroll(direction){
    const ScrollAmount=direction==="left"?-300:300 
    scrollRef.current.scrollBy({left:ScrollAmount,behavior:"smooth"});
  }
  function updateScrollButton(){
    const container=scrollRef.current;
    if(container) 
{    if(container.scrollLeft===0)
      setCanScrollLeft(true)
      else setCanScrollLeft(false)
    if(container.scrollLeft+container.clientWidth >= container.scrollWidth-5 )
      setCanScrollRight(true)
    else setCanScrollRight(false)}
  }
  useEffect(()=>{
    const container=scrollRef.current;
    if(container) {
      container.addEventListener("scroll",updateScrollButton)
    }
        return () => {
    container.removeEventListener("scroll", updateScrollButton);
  };
  },[newArrivals])
  return (
    <section className="py-16">
      <div className="cotainer mx-auto md:px-10  text-center mb-10">
          <h2 className="text-gray-800 text-3xl font-bold mb-2">Explore New Arrivals</h2>
          <p className="text-gray-600 text-lg mb-8">Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.</p>
      {/* SCORLL - BUTION */}
      <div className=" flex gap-3 justify-end mb-4">
          <button disabled={canScrollLeft} onClick={()=>scroll("left")}
           className={`p-2 border rounded bg-white text-black ${canScrollLeft?"bg-gray-200 text-gray-400 cursor-not-allowed":""}   `}><FiChevronLeft className="size-5"/></button>
          <button disabled={canScrollRight}  onClick={()=>scroll("right")} 
       className={`p-2 border rounded bg-white text-black ${canScrollRight?"bg-gray-200 text-gray-400 cursor-not-allowed":""}   `}><FiChevronRight className="size-5"/></button>
      </div> 
      <div  ref={scrollRef} className="container mx-auto px-10 flex space-x-6 overflow-x-scroll  ">
        {newArrivals.map((product)=>(
          <div key={product._id} 
          className="min-w-[100%] md:min-w-[50%] lg:min-w-[30%] relative ">
            <img src={product.images[0]?.url} alt={product.images[0]?.altText}
            className="w-full h-[500px] rounded-lg object-cover" draggable={false} />
          
          <div className="absolute bottom-0 left-0 right-0  p-4 
           text-white rounded-b-lg backdrop-blur-md bg-opacity-50 ">
            <Link to={`/product/${product.id}`}>
            <h4>{product.name}</h4>
            <p>{product.price}</p>
            </Link>
          </div>
          </div>
          
        ))}
      </div>
      </div>

    </section>
  )
}

export default NewArrivals
