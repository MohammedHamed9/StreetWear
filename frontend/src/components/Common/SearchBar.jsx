import { useState } from "react"
import { HiMagnifyingGlass, HiMiniXMark} from "react-icons/hi2";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchProductsWithFilters, setFilters } from "../../redux/reduxSlices/product";

const SearchBar = () => {
    const [searchTerm,setSearchTerm]=useState("")
    const [iseOpen,setIsOpen]=useState(false);
   const  dispatch=useDispatch()
   const navigate=useNavigate();
    function handelSubmit(e){
      e.preventDefault();
      setIsOpen(false);
      setSearchTerm("")
      dispatch(setFilters({search:searchTerm}));
      dispatch(fetchProductsWithFilters({search:searchTerm}));
      navigate(`/collections/all?search=${searchTerm}`)
    }
  return (
    <div className={` flex justify-center items-center transition-all duration-300 
    ${iseOpen?"absolute top-0 left-0 w-full md:h-28 h-36  z-50 bg-white ":"w-auto"}`}>
      {iseOpen?(
        <form  onSubmit={handelSubmit} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input type="text"
             placeholder="Search"
             value={searchTerm}
             onChange={(e)=>setSearchTerm(e.target.value)}
             className="bg-gray-100 w-full
              placeholder:text-gray-700 
             focus:outline-none py-2 pl-2 pr-12 rounded-lg"
            />
          <button className="absolute top-1/2 right-2 transform -translate-y-1/2" type="submit">
          <HiMagnifyingGlass className="size-6 text-gray-600 hover:text-gray-800"/></button>
          </div>
          {/* CLOSE - ICON  */}
          <button onClick={()=>setIsOpen(false )} >
            <HiMiniXMark className="size-6 text-gray-600 hover:text-gray-800 
            absolute ml-5 top-1/2 transform -translate-y-1/2 "/>
          </button>
        </form>
      ):(
        <button onClick={()=>setIsOpen(!iseOpen)}>
          <HiMagnifyingGlass className="size-6 text-gray-600 hover:text-black"/></button>
      )}
    </div>
  )
}

export default SearchBar
