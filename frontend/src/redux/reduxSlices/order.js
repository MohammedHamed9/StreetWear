import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL='http://localhost:3000'

export const fetchOrders=createAsyncThunk('order/fetchUserOrders',
    async(_,{rejectWithValue})=>{
        try{
            console.log("we enter")
        const res=await axios.get(`${URL}/streetwear/order/my-orders`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        });
        return res.data.orders;
        }
        catch(error){
            return rejectWithValue(error.response.data.message);
        }
})

export const fetchOrder=createAsyncThunk('order/fetchOrder',
    async(id,{rejectWithValue})=>{
        try{
           
        const res=await axios.get(`${URL}/streetwear/order/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        });
      
        return res.data.order;
        }
        catch(error){
            console.log(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        }
});

const orederSlice=createSlice({
    name:'order',
    initialState:{
        orders:[],
        totalPrice:0,
        selectedOrder:null,
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchOrders.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload
            state.totalPrice=state.orders.reduce((acc,item)=>acc +item.totalPrice ,0).toFixed(2)
        })
        .addCase(fetchOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error
        })

        .addCase(fetchOrder.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchOrder.fulfilled,(state,action)=>{
            state.loading=false;
            state.selectedOrder=action.payload
        })
        .addCase(fetchOrder.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error
        })
    }
})
export default orederSlice.reducer;
