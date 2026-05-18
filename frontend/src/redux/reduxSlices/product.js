import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "sonner";

const VITE_API_URL=import.meta.env.VITE_API_URL

const initialState={
    products:[],
    selectedProduct:null,
    similarProducts:[],
    loading:false,
    error:null,
    filters:{
        category:  "",
        gender: "",
        color:  "",
        size: [],
        material:  [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
        sortBy:"",
        search:"",
        collection:"",
    }
}
export const fetchProductsWithFilters=createAsyncThunk(
    'product/fetchProductsWithFilters',
    async(queryParams ,{rejectWithValue})=>{
        try{
            const res=await axios.get(`${VITE_API_URL}/streetwear/product`,{
                params:queryParams,
                withCredentials:true
            });
           
            return res.data
        }catch(error){
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }

});
export const fetchProductDetails=createAsyncThunk('product/fetchProductDetails',
    async(id ,{rejectWithValue})=>{
        try{
            const res=await axios.get(`${VITE_API_URL}/streetwear/product/${id}`);
            return res.data
        }catch(error){
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data);
        }

});
export const fetchSimilarProducts=createAsyncThunk('product/fetchSimilarProducts',
    async(id ,{rejectWithValue})=>{
        try{
            const res=await axios.get(`${VITE_API_URL}/streetwear/product/similr/${id}`,{
                withCredentials:true
            });
            return res.data
        }catch(error){
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }

});
const productSlice=createSlice({
    name:'product',
    initialState:initialState,
    reducers:{
        setFilters(state,action){
            state.filters={...state.filters,...action.payload}
        },
        clearFilters(state,){
        state.filters={ 
        category:  "",
        gender: "",
        color:  "",
        size: [],
        material:  [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
        sortBy:"",
        search:"",
        collection:"",
    }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProductsWithFilters.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchProductsWithFilters.fulfilled,(state,action)=>{
            state.products=Array.isArray(action.payload.products)?
            action.payload.products:[];
            state.loading=false
        })
        .addCase(fetchProductsWithFilters.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload?.message || "somthing went wrong!"
        })

        .addCase(fetchProductDetails.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
             state.selectedProduct=action.payload.product
            state.loading=false
             state.error=null
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload?.message || "somthing went wrong!"
        })

         .addCase(fetchSimilarProducts.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchSimilarProducts.fulfilled,(state,action)=>{
             state.similarProducts=Array.isArray(action.payload.similtProducts)?
             action.payload.similtProducts:[]
            state.loading=false
        })
        .addCase(fetchSimilarProducts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload?.message || "somthing went wrong!"
        })
       
         
    }
})
export const{setFilters,clearFilters}=productSlice.actions
export default  productSlice.reducer
