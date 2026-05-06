import {  useEffect, useRef, useState } from 'react'
import {FaFilter} from 'react-icons/fa'
import FilterSidebar from '../components/Products/FilterSidebar';
import ProductGrid from '../components/Products/ProductGrid';
import SortOptions from"../components/Products/SortOptions"
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsWithFilters } from '../redux/reduxSlices/product';

const Collection = () => {
    const {collection}=useParams();
    const [searchParams]=useSearchParams();
    const queryObject=Object.fromEntries(searchParams);
    let {products,loading,error}=useSelector(state=>state.product);
    
    const dispatch=useDispatch();
    const [isSidebarOpen,SetIsSidebarOpen]=useState(false);
    const sidebar=useRef();
    const Toggle=()=>{
        SetIsSidebarOpen(!isSidebarOpen);
    }

    useEffect(()=>{
  
    dispatch(fetchProductsWithFilters(queryObject));
    },[dispatch,collection,searchParams])
   
    function handelClickOutSide(e){
        if(sidebar.current && !sidebar.current.contains(e.target))
            SetIsSidebarOpen(false)
    }         
    useEffect(()=>{
        document.addEventListener("click",handelClickOutSide,true)
        return ()=> document.removeEventListener("click",handelClickOutSide,true)
    },[])
    if(error)
    return <div>
         <p className="text-center text-xl font-semibold py-10">
        Error: {error}</p>
    </div>
  return (
     <div  className='flex flex-col lg:flex-row  mt-8 sm:mt-0'>
        {/* MOBILE FILTER */}
        <button onClick={()=>SetIsSidebarOpen(!isSidebarOpen)} className=' lg:hidden border flex justify-center items-center p-2'>
            <FaFilter className='mr-2'/>Filters
        </button>

        <div ref={sidebar} 
        className={`bg-white w-56 h-full overflow-y-auto
             fixed top-0 left-0 z-50 md:z-40 transform transition-transform duration-300
            lg:static lg:translate-x-0
        ${isSidebarOpen?"translate-x-0":"-translate-x-full"}`}>
            <FilterSidebar/>
        </div>

        {/* RIGHT - DIV */}
        <div className='flex-grow p-4'>
            <div className='flex flex-col md:flex-row  items-start md:items-center justify-between gap-3 mb-4'>
            <h2 className='text-xl md:text-2xl font-medium uppercase '>All Collection</h2>
            <SortOptions/>
            </div>
            {loading?(
            <div className="flex flex-grow justify-center items-center min-h-[400px] space-x-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            </div>
            ):(<ProductGrid products={products}/> )}
            
        </div>
     </div>

  )
}

export default Collection
