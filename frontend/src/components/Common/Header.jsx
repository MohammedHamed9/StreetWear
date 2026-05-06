import Topbar from "../Layout/Topbar"
import Navbar from "./Navbar"

const Header = () => {
  return (
    <header className="border-b-2 border-gray-200 fixed top-0 left-0 bg-white z-50 w-full ">
      {/* Topbar  */}
        <Topbar/>
      {/* Navbar */}
        <Navbar/>
      {/* CartDrawer */}

    </header>
  )
}

export default Header
