import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
const VITE_API_URL=import.meta.env.VITE_API_URL

export const createUser=createAsyncThunk('admin/createUser',
    async({name,email,password,role},{rejectWithValue})=>{
        try{
            const res=await axios.post(`${VITE_API_URL}/streetwear/user/create-user`,
                {name,email,password,role},{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return res.data
        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)
export const updateUser=createAsyncThunk('admin/updateUser',
    async({id,userData},{rejectWithValue})=>{
        try{
            const res=await axios.patch(`${VITE_API_URL}/streetwear/user/update-user/${id}`,
             userData,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return res.data
        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUser=createAsyncThunk('admin/getUser',
    async({id,fields},{rejectWithValue})=>{
        try{
            const res=await axios.get(`${VITE_API_URL}/streetwear/user/get-user/${id}`,
            {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    },
                    params:{fields}
                }
            );
            return res.data
        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)
//علشان لازم ال ريجيكت وزفاليوز تبقي تاني ارجيومنت
export const getAllUser=createAsyncThunk('admin/getAllUser',
    async(_,{rejectWithValue})=>{
        try{
            const res=await axios.get(`${VITE_API_URL}/streetwear/user/get-users`,
            {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    },
                }
            );
            return res.data
        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteUser=createAsyncThunk('admin/deleteUser',
    async(id,{rejectWithValue})=>{
        try{
            const res=await axios(
                {method:'DELETE',
                url:`${VITE_API_URL}/streetwear/user/delete-user/${id}`,
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    },
            });
            return res.data
        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAllOrders=createAsyncThunk('admin/getAllOrders',
    async(_,{rejectWithValue})=>{
        try{
            const res=await axios.get(`${VITE_API_URL}/streetwear/user/get-orders`,
            {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    },
                }
            );
            return res.data
        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)
export const getOrderDetails=createAsyncThunk('admin/getOrderDetails',
    async(id,{rejectWithValue})=>{
        try{
            const res=await axios.get(`${VITE_API_URL}/streetwear/user/get-order/${id}`,
            {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    },
                }
            );
            return res.data
        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)
export const updateOrder=createAsyncThunk('admin/updateOrder',
    async({id,orderData},{rejectWithValue})=>{
        try{
            const res=await axios.patch(`${VITE_API_URL}/streetwear/user/update-order/${id}`,
             orderData,{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return res.data
        }catch(error){
            return rejectWithValue(error.response.data)
        }
    }
)
export const deleteOrder=createAsyncThunk('admin/deleteOrder',
    async(id,{rejectWithValue})=>{
        try{
            const res=await axios.delete(`${VITE_API_URL}/streetwear/user/delete-order/${id}`,
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
);
const adminSlice=createSlice({
    name:'admin',
    initialState:{
        users:[],
        userDetails:null,
        orders:[],
        orderDetails:null,
        totalOrders:0,
        totalSales:0,
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
            builder
            .addCase(createUser.pending,(state)=>{
                state.loading=true;
                state.error=null;
            }).addCase(createUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.users.push(action.payload.user);
            }).addCase(createUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message||'something went wrong!';
            })

            .addCase(updateUser.pending,(state,)=>{
                state.loading=true;
                state.error=null;
            }).addCase(updateUser.fulfilled,(state,action)=>{
                state.loading=false;
                const updatedUser=action.payload.updatedUser
                const index=state.users.findIndex((user)=>
                user._id==updatedUser._id);
                if(index!==-1){
                    state.users[index]=updatedUser;
                }
            }).addCase(updateUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message||'something went wrong!';
            })

            .addCase(deleteUser.pending,(state,)=>{
                state.loading=true;
                state.error=null;
                //action.meta.arg ده ال اي دي ال انت باعتو لل فنكشن 
                //علشان فنكشن delete مش بترجع payload اصلا
            }).addCase(deleteUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.users=state.users.filter(user=>user._id !== action.meta.arg)
            }).addCase(deleteUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message||'something went wrong!';
            })

             .addCase(getAllUser.pending,(state,)=>{
                state.loading=true;
                state.error=null;
            }).addCase(getAllUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.users=action.payload.users;
            }).addCase(getAllUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message||'something went wrong!';
            })

            .addCase(getUser.pending,(state,)=>{
                state.loading=true;
                state.error=null;
            }).addCase(getUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.userDetails=action.payload.user;
            }).addCase(getUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message||'something went wrong!';
            })

             .addCase(getAllOrders.pending,(state,)=>{
                state.loading=true;
                state.error=null;
            }).addCase(getAllOrders.fulfilled,(state,action)=>{     
                state.loading=false;
                state.orders=action.payload.orders;
                state.totalOrders=state.orders.length;
                const totalSales=state.orders.reduce((acc,order)=>
                acc + order.totalPrice ,0 )
                state.totalSales=totalSales;
            }).addCase(getAllOrders.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message||'something went wrong!';
            })

             .addCase(getOrderDetails.pending,(state,)=>{
                state.loading=true;
                state.error=null;
            }).addCase(getOrderDetails.fulfilled,(state,action)=>{
                state.loading=false;
                state.orderDetails=action.payload.order;
            }).addCase(getOrderDetails.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message||'something went wrong!';
            })

             .addCase(updateOrder.pending,(state,)=>{
                state.loading=true;
                state.error=null;
            }).addCase(updateOrder.fulfilled,(state,action)=>{
                state.loading=false;
                const updatedOrder=action.payload.updatedOrder
                const index=state.orders.findIndex(order=>order._id==updatedOrder._id);
                if(index!==-1){
                    state.orders[index]=updatedOrder;
                }
                
            }).addCase(updateOrder.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload||'something went wrong!';
            })

              .addCase(deleteOrder.pending,(state,)=>{
                state.loading=true;
                state.error=null;
            }).addCase(deleteOrder.fulfilled,(state,action)=>{
                state.loading=false;
                state.orders=state.orders.filter(order=>order._id!==action.meta.arg);
                state.totalSales-=1;    
            }).addCase(deleteOrder.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload.message||'something went wrong!';
            })
        }
    }
);
export default adminSlice.reducer