import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
const [searchParams,setSearchParams]=useSearchParams();
const filters = {
  category: searchParams.get("category") || "",
  gender: searchParams.get("gender") || "",
  color: searchParams.get("color") || "",
  size: searchParams.get("size")?.split(",") || [],
  material: searchParams.get("material")?.split(",") || [],
  brand: searchParams.get("brand")?.split(",") || [],
  minPrice: searchParams.get("minPrice") || 0,
  maxPrice: searchParams.get("maxPrice") || 100,
};
  
  const [priceRange, setPriceRange] = useState([0, 100]);

const categories = ["Top", "Bottom"];

const colors = [
  "Red",
  "Blue",
  "Black",
  "Green",
  "Yellow",
  "Gray",
  "White",
  "Pink",
  "Beige",
  "Navy"
];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const materials = [
  "Cotton",
  "Wool",
  "Denim",
  "Polyester",
  "Silk",
  "Linen",
  "Viscose",
  "Fleece",
];

const brands = [
  "Urban Threads",
  "Modern Fit",
  "Street Style",
  "Beach Breeze",
  "Fashionista",
  "ChicStyle",
];
const genders=["Men","Women"]


function handelFilterChange(e){
  const{name,value,checked,type}=e.target;
  const params=new URLSearchParams(searchParams);
  if(type==="checkbox"){
      const current=params.get(name)?.split(",")||[]
    
      if(current.includes(value)){
      const updated= current.filter(v=>v!=value);
        updated.length>0?params.set(name,updated.join(",")) :params.delete(name); 
      }else{
        params.set(name,[...current,value].join(","))
      }
  }else{
    params.set(name,value)
  }
  console.log(params.toString());
  setSearchParams(params);
  console.log(searchParams.toString())
}

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-900">Filter</h3>
      
      {/* CATEGORY */}
      <div className="mt-4">
        <label className="font-medium text-lg text-gray-600 ">Category</label>
        {categories.map((category)=>(
          <div key={category} className="flex items-center mb-1 ">
          <input type="radio" name="category" 
          value={category} onChange={handelFilterChange}  
          className="mr-2 size-4 border-gray-300 text-blue-500
           focus:text-blue-400 " 
          checked={filters.category===category}/>
          <span>{category} Wear</span>
          </div>
        ))}
      </div>

        {/* GENDER */}
      <div className="my-4">
        <label className="font-medium text-lg text-gray-600 ">Gender</label>
        {genders.map((gender)=>(
          <div key={gender} className="flex items-center mb-1 ">
          <input type="radio" name="gender"
           value={gender} onChange={handelFilterChange}
            className="mr-2 size-4 border-gray-300 text-blue-500
             focus:text-blue-400 "
             checked={filters.gender===gender} />
          <span>{gender}</span>
          </div>
        ))}
      </div>

      {/* COLOR - FILTER  */}
      <div className="mb-6">
        <label className="font-medium text-lg text-gray-600 ">Colors</label>
         <div className="flex gap-2 flex-wrap mt-2">
          {colors.map((color)=>(
          <button key={color}
           name="color" value={color} onClick={handelFilterChange}
          style={{background:color.toLocaleLowerCase()}}
          className={`h-8 w-8 rounded-full brightness-75 border-gray-300
            transition hover:scale-105 
            ${filters.color===color?"ring-2 ring-blue-500":""}`}></button>
        ))}
         </div>
      </div>

      {/* SIZES */}
      <div className="mb-6">
        <label className="font-medium text-lg text-gray-600 ">Sizes</label>
        <div className="flex flex-col gap-1 mt-2">
          {sizes.map((size)=>(
            <div key={size} className="flex items-center">
              <input type="checkbox" name="size"
              value={size} onChange={handelFilterChange}
               className="mr-2 size-4 border-gray-300 text-blue-500
                focus:text-blue-400 "
                checked={filters.size.includes(size)} />
            <span>{size}</span>
            </div>
          ))}
        </div>
      </div>

       {/* MATERIALS */}
      <div className="mb-6">
        <label className="font-medium text-lg text-gray-600 ">Materials</label>
        <div className="flex flex-col gap-1 mt-2">
          {materials.map((material)=>(
            <div key={material} className="flex items-center">
              <input type="checkbox" name="material"
              value={material} onChange={handelFilterChange} 
              className="mr-2 size-4 border-gray-300 text-blue-500
               focus:text-blue-400 "
               checked={filters.material.includes(material)} />
            <span>{material}</span>
            </div>
          ))}
        </div>
      </div>

       {/* BRANDS */}
      <div className="mb-6">
        <label className="font-medium text-lg text-gray-600 ">Brand</label>
        <div className="flex flex-col gap-1 mt-2">
          {brands.map((brand)=>(
            <div key={brand} className="flex items-center ">
              <input type="checkbox" name="brand"
              value={brand} onChange={handelFilterChange} 
              className="mr-2 size-4 border-gray-300 text-blue-500
               focus:text-blue-400 "
              checked={filters.brand.includes(brand)} />
            <span>{brand}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <label className="font-medium text-lg text-gray-600 ">Price Range</label>
        <input type="range" min={0} max={100} name="maxPrice"
         onChange={handelFilterChange}
        className="w-full h-2 bg-gray-300 rounded-lg
         appearance-none cursor-pointer" 
         value={filters.maxPrice}/>
        <div className="flex justify-between text-gray-600">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar
