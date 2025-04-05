import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';


export const addOnwer=createAsyncThunk(
    "onwer/addOnwer",
    async (onwer,thunkApi)=>{

      const requiredFields = ['firstName', 'lastName', 'phone', 'identityNumber', 'state', 'image','city','address'];
      const missingField = requiredFields.find((field) => !onwer.get(field));

      if (missingField) {
        return toast.error(`Field "${missingField}" is required`);
      }

        try {

             const res=await axios.post('http://localhost:3000/api/admin/add-onwer',onwer, {
                   withCredentials: true,
                   headers: {
                      'Content-Type': 'multipart/form-data',
                    }
        });
        return res.data;
            
        } catch (error) {
            const message = 
        (error.response && error.response.data && error.response.data.message) || 
        error.message || 
        error.toString();
        toast.error(message);
        return thunkApi.rejectWithValue(message);
            
        }
    
    }
)


export const getOwners=createAsyncThunk(
    "onwer/getOwners",
    async (_,thunkApi)=>{
        try {
            const res=await axios.get('http://localhost:3000/api/admin/get-onwers',{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json'
                }
            });
            return res.data;
            
        } catch (error) {
            const message = 
        (error.response && error.response.data && error.response.data.message) || 
        error.message || 
        error.toString();
        toast.error(message);
        return thunkApi.rejectWithValue(message);
            
        }
    }
)



const onwerSlice=createSlice({
    name:'onwer',
    initialState:{
        onwers:[],
        message:'',
        loading:false,
        error:false
    },
    extraReducers:(builder)=>{
       builder
       .addCase(addOnwer.pending,(state,action)=>{
           state.loading=true;
       })
       .addCase(addOnwer.fulfilled,(state,action)=>{
           state.loading=false;
           state.message=action.payload.message;
           toast.success(state.message);
       })
         .addCase(addOnwer.rejected,(state,action)=>{
              state.loading=false;
              state.error=action.payload;
              toast.error(action.payload.error);
         })
         .addCase(getOwners.pending,(state,action)=>{
             state.loading=true;
         })
         .addCase(getOwners.fulfilled,(state,action)=>{
                state.loading=false;
                state.onwers=action.payload;
         })
         .addCase(getOwners.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
                toast.error(action.payload.error);
         })
    }
})



export default onwerSlice.reducer;