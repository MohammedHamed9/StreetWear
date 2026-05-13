import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from"axios"
import { toast } from "sonner";
const VITE_API_URL=import.meta.env.VITE_API_URL

//LOCAL-STORAGE VARS
const userFromStorage=
localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null
const initailGuestId=
localStorage.getItem("guestId")|| localStorage.setItem("guestId",`guest-${new Date().getTime()}`)
//INIATAL STATE
let initialState={
    user:userFromStorage,
    guestId:initailGuestId,
    loading:false,
    error:""
}

//2 ASYNC THUNKS 
export const loginUser=createAsyncThunk('auth/loginUser',
    async(userData,{rejectWithValue})=>{
    try{
   const res=await axios.post(`${VITE_API_URL}/streetwear/user/login`,userData);
        localStorage.setItem("userInfo",JSON.stringify(res.data.user));
        localStorage.setItem("userToken",res.data.token);
        toast.success("Login Successfully✅")
        return res.data;
    }
    catch(error){
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data.message);
    }

})
export const registerUser=createAsyncThunk('auth/registerUser',
    async(userData,{rejectWithValue})=>{
        try{
        const res=await axios.post(`${VITE_API_URL}/streetwear/user/register`,userData);
        localStorage.setItem("userInfo",JSON.stringify(res.data.user))
        localStorage.setItem("userToken",res.data.token);
        toast.success("Register successfully✅")
        console.log(res.data);
        return res.data;
        }
        catch(error){
             toast.error(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        }
})

//THE SLICE
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout(state){
            state.user=null;
            state.guestId=`guest-${new Date().getTime()}`,
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId",state.guestId);
        },
        generateNewGuset(state){
            state.guestId=`guest-${new Date().getTime()}`,
            localStorage.setItem("guestId",state.guestId);
        }
    },
        extraReducers:(builder)=>{
            builder
            .addCase(loginUser.pending,(state)=>{
                state.loading=true;
                state.error=null;
            }).addCase(loginUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.user=action.payload.user;
            }).addCase(loginUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })  

             .addCase(registerUser.pending,(state)=>{
                state.loading=true;
                state.error=null;
            }).addCase(registerUser.fulfilled,(state,action)=>{
                state.loading=false;
                state.user=action.payload.user;
            }).addCase(registerUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            }) 
        }
    
});

export const {logout,generateNewGuset}=authSlice.actions
export default authSlice.reducer;