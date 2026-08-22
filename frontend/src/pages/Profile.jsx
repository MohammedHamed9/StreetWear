import MyOrders from "./MyOrders";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reduxSlices/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/reduxSlices/cart";
const Profile = () => {
  const { user, guestId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  function handelLogout() {
    dispatch(logout());
    dispatch(clearCart());
  }
  return (
    <div className="min-h-[100vh] ">
      <div className="container mx-auto px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* RIGHT - DIV */}
          <div className="w-full md:w-1/3 h-fit lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-xl lg:text-2xl font-bold mb-4">{user?.name}</h1>
            <p className="text-sm md-text-lg  text-gray-600 mb-4 ">
              {user?.email}
            </p>
            <button
              onClick={() => {
                navigate("/Edit-profile");
              }}
              className="mb-4 text-white w-full px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg"
            >
              Edit Profile
            </button>
            <button
              onClick={() => handelLogout()}
              className="text-white bg-red-500 hover:bg-red-600 transition px-6 py-3 w-full rounded-lg"
            >
              Logout
            </button>
          </div>

          {/* LEFT - DIV */}
          <div className="w-full md:w-2/3 lg:w-3/4  ">
            <MyOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
