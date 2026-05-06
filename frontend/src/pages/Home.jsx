import Hero from "../components/Layout/Hero"
import ProductDetails from "../components/Products/ProductDetails"
import GenderCollection from "../components/Products/GenderCollection"
import NewArrivals from "../components/Products/NewArrivals"
import YouMayLike from "../components/Products/ProductGrid"
import ProductGrid from "../components/Products/ProductGrid"
import FeaturedCollection from "../components/Products/FeaturedCollection"
import New from "../components/Products/FeaturedSection"
import ScrollTop from "../ScrollTop"
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react"
import { fetchProductsWithFilters } from "../redux/reduxSlices/product"
import axios from "axios"
const URL='http://localhost:3000'

const Home = () => {
    const dipatch=useDispatch()
    const{products,loading,error}=useSelector((state)=>state.product)
    const [bestSellerProduct,setBestSellerProduct]=useState(null);
//fetch women collection
useEffect(()=>{
    dipatch(fetchProductsWithFilters({
        gender:'Women',
        category:'Top',
    }));
    async function fetchBestSellerProduct(){
        try{
        const res=await axios.get(`${URL}/streetwear/product/best-seller`);
        setBestSellerProduct(res.data.best_seller); 
    }
      catch(error){
        console.log(error);
      }
    }
    fetchBestSellerProduct()
},[])
  return (
    <div>
      <Hero/>
      <GenderCollection/>
      <NewArrivals/>
      <h2 className="text-gray-800 text-3xl font-bold text-center">Best Seller </h2>
      {bestSellerProduct?(<ProductDetails productId={bestSellerProduct._id}/>):(
        <p className="text-center">Loading Best seller Product</p>
      )}
      <div className="container mx-auto px-10 mt-10">
        <h2 className="text-gray-800 text-3xl text-center font-bold mb-4">Women Top Wear</h2>
      <ProductGrid products={products} loading={loading} error={error}/>
      </div>
      <FeaturedCollection/>
      <New/>
    </div>
  )
}

export default Home
