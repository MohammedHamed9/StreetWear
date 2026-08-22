import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import Collection from "./pages/Collection";
import ProductDetails from "./components/Products/ProductDetails";
import ScrollTop from "./ScrollTop";
import ChcekOut from "./components/Cart/ChcekOut";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetails from "./pages/OrderDetails";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashborad from "./components/Admin/AdminDashborad";
import UserManagment from "./components/Admin/UserManagment";
import ProductManagment from "./components/Admin/ProductManagment";
import EditProduct from "./components/Admin/EditProduct";
import OrderManagment from "./components/Admin/OrderManagment";
import ScrollTopButtom from "./components/Common/ScrollTopButton";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Forgetpassword from "./pages/Forgetpassword";
import ConfirmResetToken from "./pages/ConfirmResetToken";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EditProfile from "./pages/EditProfilePage";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollTop />
        <ScrollTopButtom />
        {/*User Routes*/}
        <Routes>
          <Route element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<Forgetpassword />} />
            <Route
              path="/confirm-reset-password"
              element={<ConfirmResetToken />}
            />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/collections/:collection" element={<Collection />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<ChcekOut />} />
            <Route
              path="/order-confirmation/:id"
              element={<OrderConfirmation />}
            />
            <Route path="/order/:orderId" element={<OrderDetails />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="/Edit-profile" element={<EditProfile />} />
          </Route>

          {/*Admin Routes*/}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role={"Admin"}>
                <AdminLayout />{" "}
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashborad />} />
            {/* /admin/users */}
            <Route path="users" element={<UserManagment />} />
            {/* /admin/products */}
            <Route path="products" element={<ProductManagment />} />
            <Route path="products/:productId/edit" element={<EditProduct />} />
            <Route path="orders" element={<OrderManagment />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
