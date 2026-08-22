import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3 } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navBar, setNavBar] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <nav className="container  mx-auto px-4 md:px-10 py-6 flex justify-between items-center">
        {/*LEFT - LOGO */}
        <div>
          <Link to="/" className="text-2xl font-semibold">
            StreetWear
          </Link>
        </div>

        {/*CENTER - NAVIGATION */}

        <div className="hidden md:flex justify-center items-center space-x-4">
          <Link
            to="/collections/Men?gender=Men"
            className="uppercase text-gray-700 hover:text-black text-sm font-medium"
          >
            Men{" "}
          </Link>
          <Link
            to="/collections/Women?gender=Women"
            className="uppercase text-gray-700 hover:text-black text-sm font-medium"
          >
            Women{" "}
          </Link>
          <Link
            to="/collections/Top?category=Top"
            className="uppercase text-gray-700 hover:text-black text-sm font-medium"
          >
            Top wear{" "}
          </Link>
          <Link
            to="/collections/Bottom?category=Bottom"
            className="uppercase text-gray-700 hover:text-black text-sm font-medium"
          >
            bottom wear{" "}
          </Link>
        </div>
        {/*LEFT - ICONS  */}

        <div className="flex items-center space-x-4 ">
          {user && user.role == "Admin" && (
            <Link
              to={"/admin"}
              className="bg-black text-white text-sm px-3 py-1 rounded-full "
            >
              Admin
            </Link>
          )}

          <Link to={user ? "/profile" : "/login"} className="hover:text-black">
            <HiOutlineUser className="size-6 text-gray-700" />
          </Link>
          <button
            className="relative hover:text-black"
            onClick={(e) => {
              e.stopPropagation();
              setDrawerOpen(true);
            }}
          >
            <HiOutlineShoppingBag className="size-6 text-gray-700" />
            {cart?.products.length > 0 && (
              <span className="absolute -top-1  bg-sw-red text-white text-xs px-1 py-0.5 rounded-full">
                {cart.products.length}
              </span>
            )}
          </button>
          {/* SEARCH */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button
            onClick={() => setNavBar(!navBar)}
            className="md:hidden hover:text-black"
          >
            <HiBars3 className="size-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <div
        className={`fixed top-0 left-0 z-50 w-3/4 sm:w-1/3 h-full bg-white
   transform transition-transform duration-300 
   ${navBar ? "translate-x-0" : "-translate-x-full"}
   `}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setNavBar(false)}>
            <IoMdClose className="size-6 text-gray-600 hover:text-gray-900" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-3">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              onClick={() => setNavBar(false)}
              className=" block text-gray-600 hover:text-black"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={() => setNavBar(false)}
              className="block text-gray-600 hover:text-black"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top"
              onClick={() => setNavBar(false)}
              className="block text-gray-600 hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom"
              onClick={() => setNavBar(false)}
              className="block text-gray-600 hover:text-black"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
