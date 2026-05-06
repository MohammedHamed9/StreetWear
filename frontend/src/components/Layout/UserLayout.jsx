import { Outlet } from "react-router-dom"
import Home from "../../pages/Home"
import Footer from "../Common/Footer"
import Header from "../Common/Header"
import ScrollTop from "../../ScrollTop"

const UserLayout = () => {
  return (
    <div>
      {/* Header  */}
        <Header/>
      {/* main-content */}
      <main className="pt-32">
        <Outlet/>
        </main>
      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default UserLayout
