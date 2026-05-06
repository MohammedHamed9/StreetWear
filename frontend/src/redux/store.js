
import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./reduxSlices/auth"
import productSlice from "./reduxSlices/product"
import cartSlice from "./reduxSlices/cart"
import checkoutSlice from "./reduxSlices/checkout"
import orderSlice from "./reduxSlices/order"
import adminSlice from "./reduxSlices/admin"
import adminProdcutsSlice from "./reduxSlices/adminProdcuts"
const store=configureStore({
    reducer:{
        auth:authReducer,
        product:productSlice,
        cart:cartSlice,
        checkout:checkoutSlice,
        order:orderSlice,
        admin:adminSlice,
        adminProduct:adminProdcutsSlice
    }
});
 export default store;
