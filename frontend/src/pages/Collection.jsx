import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import ProductGrid from "../components/Products/ProductGrid";
import SortOptions from "../components/Products/SortOptions";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsWithFilters } from "../redux/reduxSlices/product";

const Collection = () => {
  const { collection } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryObject = Object.fromEntries(searchParams);
  const [currentPage, setCurrentPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  let { products, loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [isSidebarOpen, SetIsSidebarOpen] = useState(false);
  const sidebar = useRef();
  const Toggle = () => {
    SetIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    dispatch(fetchProductsWithFilters(queryObject))
      .unwrap()
      .then((res) => setNumOfPages(res.paginate.totalPages))
      .catch((error) => console.log(error));
  }, [dispatch, collection, searchParams]);

  function hanelPageChange(index) {
    const params = new URLSearchParams(searchParams);
    if (queryObject.page) {
      setCurrentPage(index);
      params.set("page", index);
    } else {
      setCurrentPage(index);
      params.append("page", index);
    }

    setSearchParams(params);
  }
  function handelPageMoving(step) {
    const params = new URLSearchParams(searchParams);
    params.set("page", currentPage + step);
    setSearchParams(params);
    setCurrentPage((currentPage) => currentPage + step);
  }
  function handelChangeLimit(e) {
    const limit = e.target.value;
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    params.set("limit", limit);
    setSearchParams(params);
  }
  function handelClickOutSide(e) {
    if (sidebar.current && !sidebar.current.contains(e.target))
      SetIsSidebarOpen(false);
  }
  useEffect(() => {
    document.addEventListener("click", handelClickOutSide, true);
    return () =>
      document.removeEventListener("click", handelClickOutSide, true);
  }, []);

  if (error)
    return (
      <div>
        <p className="text-center text-xl font-semibold py-10">
          Error: {error}
        </p>
      </div>
    );
  return (
    <div className="flex flex-col lg:flex-row  mt-8 sm:mt-0">
      {/* MOBILE FILTER */}
      <button
        onClick={() => SetIsSidebarOpen(!isSidebarOpen)}
        className=" lg:hidden border flex justify-center items-center p-2"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      <div
        ref={sidebar}
        className={`bg-white w-56 h-full overflow-y-auto
             fixed top-0 left-0 z-50 md:z-40 transform transition-transform duration-300
            lg:static lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <FilterSidebar />
      </div>

      {/* RIGHT - DIV */}
      <div className="flex-grow p-4">
        <div className="flex flex-col md:flex-row  items-start md:items-center justify-between gap-3 mb-4">
          <h2 className="text-xl md:text-2xl font-medium uppercase ">
            {`${collection} Collection`}
          </h2>
          <SortOptions />
        </div>
        {loading ? (
          <div className="flex flex-grow justify-center items-center min-h-[400px] space-x-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
        <div className="flex  flex-col justify-between items-center mt-4">
          <nav
            aria-label="Page navigation example"
            className="flex items-center space-x-4"
          >
            <ul className="flex -space-x-px text-sm">
              <li>
                <button
                  onClick={() => handelPageMoving(-1)}
                  className="flex items-center
                   justify-center text-body 
                   bg-neutral-secondary-medium
                    border border-default-medium 
                    hover:bg-neutral-tertiary-medium 
                    hover:text-heading shadow-xs 
                    font-medium leading-5 
                    rounded-s-base text-sm px-3 h-9 focus:outline-none
                    disabled:opacity-50
                     disabled:cursor-not-allowed 
                      disabled:hover:text-body "
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {numOfPages > 1 &&
                Array.from({ length: numOfPages }, (_, index) => (
                  <li>
                    <button
                      onClick={() => hanelPageChange(index + 1)}
                      className="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 text-sm w-9 h-9 focus:outline-none"
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              <li>
                <button
                  onClick={() => handelPageMoving(1)}
                  disabled={currentPage === numOfPages}
                  className="flex items-center justify-center text-body bg-neutral-secondary-medium border
                   border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading
                    shadow-xs font-medium leading-5 rounded-e-base text-sm px-3 h-9 
                    focus:outline-none
                    disabled:opacity-50
                     disabled:cursor-not-allowed 
                      disabled:hover:text-body"
                >
                  Next
                </button>
              </li>
            </ul>
            <form className="w-32 mx-auto">
              <label for="countries" className="sr-only">
                Select an option
              </label>
              <select
                id="countries"
                className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm leading-4 rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                onChange={(e) => handelChangeLimit(e)}
                value={queryObject.limit}
              >
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
                <option value="100">100 per page</option>
              </select>
            </form>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Collection;
