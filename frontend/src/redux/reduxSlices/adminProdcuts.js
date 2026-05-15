import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
const VITE_API_URL=import.meta.env.VITE_API_URL

export const createProduct=createAsyncThunk('admin/createProduct',
    async({
                name,
                description,
                price,
                discountPrice,
                category,
                brand,
                variants,
                collections,
                material,
                gender,
                isFeatured,
                isPublished,
                tags,
                dimenstions,
                weight,
                sku,
                fit
        },{rejectWithValue})=>{
        try{
            const res=await axios.post(`${VITE_API_URL}/streetwear/product`,
                {
                name,
                description,
                price,
                discountPrice,
                category,
                brand,
                variants,
                collections,
                material,
                gender,
                isFeatured,
                isPublished,
                tags,
                dimenstions,
                weight,
                sku,
                fit
        },{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            toast.success(res.data.message)
            return res.data
        }catch(error){
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data)
        }
    }
)
export const updateProduct=createAsyncThunk('admin/updateProduct',
    async({id ,productData},{rejectWithValue})=>{
        try{
            const res=await axios.patch(`${VITE_API_URL}/streetwear/product/${id}`,productData,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("userToken")}`
                }
            });
            toast.success(res.data.message)
            return res.data
        }catch(error){
            toast.error(error.response.data.message)
            return rejectWithValue(error.response.data);
}

});
//علشان لازم ال ريجيكت وزفاليوز تبقي تاني ارجيومنت
export const getAllProducts=createAsyncThunk('admin/getAllProducts',
    async(_,{rejectWithValue})=>{
        try{
            const res=await axios.get(`${VITE_API_URL}/streetwear/product`,
            {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    },
                }
            );
            return res.data
        }catch(error){
            toast.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)
export const deleteProduct=createAsyncThunk('admin/deleteProduct',
    async(id,{rejectWithValue})=>{
        try{
            const res=await axios(
                {method:'DELETE',
                url:`${VITE_API_URL}/streetwear/product/${id}`,
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    },
            });
            toast.success(res.data.message)
            return res.data
        }catch(error){
             toast.error(error.response.data.message)
            return rejectWithValue(error.response.data)
        }
    }
)

const adminProductSlice=createSlice({
    name:'adminProducts',
    initialState:{
        products:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
            builder
            .addCase(createProduct.pending,(state)=>{
                state.loading=true;
                state.error=null;
            }).addCase(createProduct.fulfilled,(state,action)=>{
                state.loading=false;
                state.products.push(action.payload.products);
            }).addCase(createProduct.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message||'something went wrong!';
            })

            .addCase(updateProduct.pending,(state,)=>{
                state.loading=true;
                state.error=null;
            })
            .addCase(updateProduct.fulfilled,(state,action)=>{
                state.loading=false;
                const updatedProduct=action.payload.product

                const index=state.products.findIndex((product)=>
                product._id==updatedProduct._id);
                if(index!==-1){
                    state.products[index]=updatedProduct;
                }
            }).addCase(updateProduct.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload||'something went wrong!';
            })

            .addCase(deleteProduct.pending,(state,)=>{
                state.loading=true;
                state.error=null;
                //action.meta.arg ده ال اي دي ال انت باعتو لل فنكشن 
                //علشان فنكشن delete مش بترجع payload اصلا
            }).addCase(deleteProduct.fulfilled,(state,action)=>{
                state.loading=false;
                state.products=state.products.filter(user=>user._id !== action.meta.arg)
            }).addCase(deleteProduct.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message||'something went wrong!';
            })

             .addCase(getAllProducts.pending,(state,)=>{
                state.loading=true;
                state.error=null;
            }).addCase(getAllProducts.fulfilled,(state,action)=>{
                state.loading=false;
                state.products=action.payload.products;
            }).addCase(getAllProducts.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload?.message||'something went wrong!';
            })
        }
    }
);
export default adminProductSlice.reducer