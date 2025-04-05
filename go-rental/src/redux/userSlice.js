import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import {jwtDecode} from 'jwt-decode'



export const userRegister=createAsyncThunk(
    'user/register',
    async (input,thunkApi)=>{
            try {

                const res=await axios.post('http://localhost:3000/api/user/registerUser',input,{withCredentials:true});
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

export const userLogin =createAsyncThunk(
    'user/userlogin',
    async (input,thunkApi)=>{

        try {

            const res=await axios.post('http://localhost:3000/api/user/loginUser',input,{
                withCredentials:true
            })

            const data=res.data;
            localStorage.setItem('userToken',data.token);

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

            localStorage.removeItem('userToken')
            return ""
            
        } else {

            return decodeToken.role;
            
        }
        
    }else{
       return ''
    }

}




const userSlice=createSlice({
    name:'user',
    initialState:{
        data:[],
        isLoading:false,
        error:null,
        role:returnRole(localStorage.getItem('userToken')),
        token:localStorage.getItem('userToken'),
        message:''
    },
    extraReducers:(builder)=>{
        builder
        .addCase(userRegister.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(userRegister.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.message=action.payload.message;
            state.token=action.payload.token;
            state.role=returnRole(action.payload.token);
        })
        .addCase(userRegister.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload
        })
        .addCase(userLogin.pending,(state,action)=>{
            state.isLoading=true;
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.message=action.payload.message;
            state.token=action.payload.token;
            state.role=returnRole(action.payload.token)
            toast.success(state.message);
        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=action.payload
        })
    }
})



export default userSlice.reducer;