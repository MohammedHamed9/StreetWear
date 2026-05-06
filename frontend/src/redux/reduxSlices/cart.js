import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
const URL='http://localhost:3000'
const VITE_API_URL='https://street-wear-ten.vercel.app'

const getCart=()=>{
    const storedCart=localStorage.getItem("cart");
    return storedCart?JSON.parse(storedCart):{products:[]}
}
const saveCartToStorage=(cart)=>{
    localStorage.setItem("cart",JSON.stringify(cart));
}
export const fetchCart=createAsyncThunk('cart/fetchCart',
    async({userId,guestId},{rejectWithValue})=>{
    try{
        const res=await axios.get(`${VITE_API_URL}/streetwear/cart`,{
            params:{userId,guestId}
        });
    
        return res.data;
    }catch(error){
            console.log(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        }
    }
)
export const addToCart=createAsyncThunk('cart/addToCart',
    async({productId,userId,guestId,size,color,quantity},{rejectWithValue})=>{
        try{
        const res=await axios.post(`${VITE_API_URL}/streetwear/cart`,
            {productId,userId,guestId,size,color,quantity});
        toast.success("the product is added successfully..")
        return res.data
        }catch(error){
            toast.error(error.response.data.message|| "Failed to add product")
            console.log(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        }
})
export const updateProductQuantity=createAsyncThunk('cart/updateProductQuantity',
    async({productId,quantity,size,color,userId,guestId},{rejectWithValue})=>{
        try{
            console.log({productId,quantity,size,color,userId,guestId}  )
        const res=await axios.patch(`${VITE_API_URL}/streetwear/cart`,
            {productId,quantity,size,color,userId,guestId});
            console.log(res.data);
        return res.data
        }catch(error){
            console.log(error.response.data.message);
            return rejectWithValue(error.response.data.message);
        }
})

export const removeProduct=createAsyncThunk('cart/removeProduct',
    async({productId,size,color,userId,guestId},{rejectWithValue})=>{
        try{
        const res=await axios({
                method:'DELETE',
                url:`${VITE_API_URL}/streetwear/cart`,
            data:{productId,size,color,userId,guestId}
       } );
        return res.data
        }catch(error){
            return rejectWithValue(error.response.data.message);
        }
})
export const mergeCarts=createAsyncThunk('cart/mergeCarts',
    async(guestId,{rejectWithValue})=>{
    try{
        const res=await axios.post(`${VITE_API_URL}/streetwear/cart/mergeCarts`,{guestId},{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("userToken")}`
            }
        });
        return res.data;
    }catch(error){
            return rejectWithValue(error.response.data.message);
        }
    }
)
const cartSlice=createSlice({
    name:'cart',    
    initialState:{
        cart:getCart(),
        loading:false,
        error:null
    },
    reducers:{
        clearCart:(state,action)=>{
            state.cart={products:[]}
            localStorage.removeItem("cart");
            state.loading=false
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCart.pending,(state,action)=>{
        state.loading=true
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
        state.loading=false;
        state.cart=action.payload.cart;
        saveCartToStorage(action.payload.cart)
        })
        .addCase(fetchCart.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||'faild to fetch';
        })

        .addCase(addToCart.pending,(state,action)=>{
        state.loading=true
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
        state.loading=false;
        state.cart=action.payload.cart;
        saveCartToStorage(action.payload.cart)
        })
        .addCase(addToCart.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||'faild to fetch';
        })

        .addCase(updateProductQuantity.pending,(state,action)=>{
        state.loading=true
        })
        .addCase(updateProductQuantity.fulfilled,(state,action)=>{
        state.loading=false;
        state.cart=action.payload.cart;
        saveCartToStorage(action.payload.cart)
        })
        .addCase(updateProductQuantity.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||'faild to fetch';
        })

         .addCase(removeProduct.pending,(state,action)=>{
        state.loading=true
        })
        .addCase(removeProduct.fulfilled,(state,action)=>{
        state.loading=false;
        state.cart=action.payload.cart;
        saveCartToStorage(action.payload.cart)
        })
        .addCase(removeProduct.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||'faild to delete item';
        })


        .addCase(mergeCarts.pending,(state,action)=>{
        state.loading=true
        })
        .addCase(mergeCarts.fulfilled,(state,action)=>{
        state.loading=false;
        state.cart=action.payload.cart;
        saveCartToStorage(action.payload.cart)
        })
        .addCase(mergeCarts.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||'faild to merage carts';
        })
    }
})
export default cartSlice.reducer
export const {clearCart}=cartSlice.actions