import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import {jwtDecode} from 'jwt-decode'




export const adminRegister=createAsyncThunk(
    'admin/register',
    async (input,thunkApi)=>{
            try {

                const res=await axios.post('http://localhost:3000/api/user/registerAdmin',input,{withCredentials:true});
                const data=res.data;
                return data;
                
            } catch (error) {
                const message = (error.response && error.response.data && error.response.data.message) || 
                    error.message || 
                    error.toString();
                    toast.error(message);
                    return thunkApi.rejectWithValue(message);
            } 
    }
)

export const adminLogin =createAsyncThunk(
    'admin/adminlogin',
    async (input,thunkApi)=>{

        try {

            const res=await axios.post('http://localhost:3000/api/user/loginAdmin',input,{
                withCredentials:true
            })

            const data=res.data;
            localStorage.setItem('accessToken',data.token);

            return data;
            
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || 
                    error.message || 
                    error.toString();
                    toast.error(message);
                    return thunkApi.rejectWithValue(message);
        }

    }
)



const returnRole=(token)=>{

    if(token){
        const decodeToken=jwtDecode(token);

        const ExpireTime=new Date(decodeToken.exp * 1000);

        if (new Date() > ExpireTime) {

            localStorage.removeItem('accessToken')
            return ""
            
        } else {

            return decodeToken.role;
            
        }
        
    }else{
       return ''
    }

}




const adminSlice=createSlice({
    name:'admin',
    initialState:{
        data:[],
        isLoading:false,
        error:null,
        role:returnRole(localStorage.getItem('accessToken')),
        token:localStorage.getItem('accessToken'),
        message:''
    },
    extraReducers:(builder)=>{
        builder
        .addCase(adminRegister.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(adminRegister.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.message=action.payload.message;
            state.token=action.payload.token;
            state.role=returnRole(action.payload.token);
        })
        .addCase(adminRegister.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload
        })
        .addCase(adminLogin.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.message=action.payload.message;
            state.token=action.payload.token;
            state.role=returnRole(action.payload.token)
            toast.success(state.message);
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload
        })
    }
})



export default adminSlice.reducer;