import { Link } from "react-router-dom"
import mensCollection from "../../assets/mens-collection.webp"
import womensCollection from "../../assets/womens-collection.webp"
const GenderCollection = () => {
  return (
    <div className="py-12 px-4 md:px-10">
        <div className="container mx-auto flex flex-col  md:flex-row gap-10 ">
            <div className="relative flex-1">
            <img src={womensCollection} alt="" className=" w-full h-[600px]" />
            <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-5">
                <h2 className="text-2xl font-bold mb-3">Women's Collection</h2>
                <Link to="/collections/women" className="underline">Shop Now</Link>
            </div>
            </div>
            <div className=" relative flex-1">
            <img src={mensCollection} alt="" className=" w-full h-[600px]"/>
            <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-5">
                <h2 className="text-2xl font-bold mb-3">Men's Collection</h2>
                <Link to="/collections/men" className="underline">Shop Now</Link>
            </div>
            </div>
        </div>
    </div>
  )
}
{/*  */}
export default GenderCollection
