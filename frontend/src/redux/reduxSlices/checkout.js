import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL='http://localhost:3000'
const VITE_API_URL='https://street-wear-ten.vercel.app'

export const createCheckout=createAsyncThunk('checkout/createCheckout',
    async({checkoutItems,shippingAddress,paymentMethod,totalPrice}
        ,{rejectWithValue})=>{
           try{
                const res=await axios.post(`${VITE_API_URL}/streetwear/checkout`,
                {checkoutItems,shippingAddress,paymentMethod,totalPrice},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return res.data;
           }
           catch(error){
            console.log(error.response.data)
            return rejectWithValue(error.response.data)
           }

    }
)
export const payCheckout=createAsyncThunk('checkout/payCheckout',
    async({paymentDetails,paymentStatus,id}
        ,{rejectWithValue})=>{
           try{
                const res=await axios.put(`${VITE_API_URL}/streetwear/checkout/${id}/pay`,
                {paymentDetails,paymentStatus},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return res;
           }
           catch(error){
            return rejectWithValue(error.response?.data?.message || "Payment Failed");
           }

    }
)

export const finalizeCheckOut=createAsyncThunk('checkout/finalizeCheckOut',
    async(id,{rejectWithValue})=>{
           try{
                const res=await axios.put(`${VITE_API_URL}/streetwear/checkout/${id}/finalize`,{},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return res;
           }
           catch(error){
            console.log(error.response.data.message)
            return rejectWithValue(error.response?.data?.message || "Payment Failed");
           }

    }
)
const checkoutSlice=createSlice({
    name:'checkout',
    initialState:{
        checkout:null,
        loading:false,
        error:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(createCheckout.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(createCheckout.fulfilled,(state,action)=>{
            state.loading=false;
            state.checkout=action.payload.checkout;
    })
    .addCase(createCheckout.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload||'something went wrong!';
    })
    }
}); 
export default checkoutSlice.reducer;