import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    function handelSort(e){
        searchParams.set("sortBy",e.target.value)
        setSearchParams(searchParams)
    }
  return (
    <div className="">
      <select id="sort"
       className="border p-2 focus:outline-none rounded-md"
       value={searchParams.get("sortBy")||""}
       onChange={handelSort}>
        <option value="">Default</option>
        <option value="priceAsc">Price:Low to High</option>
        <option value="priceDesc">Price:High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};

export default SortOptions;
