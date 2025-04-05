import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";




export const addCar=createAsyncThunk(
    "car/addCar",
    async (car,thunkApi)=>{
      

        const requiredFields = ['name', 'brand', 'rentPerkm', 'model','color','fuelType','AC','doors','seats','driveTrain','VIN','Engine','mileage','category','transmission','owner'];
        const missingField = requiredFields.find((field) => !car.get(field));
        

        if (missingField) {
            toast.error(`Field "${missingField}" is required`);
            return thunkApi.rejectWithValue(`Field "${missingField}" is required`);
          }


        try {
            const res=await axios.post('http://localhost:3000/api/admin/addCar',car, {
                withCredentials: true,
                headers: {
                   'Content-Type': 'multipart/form-data',
                 }
            });
            toast.success(res.data.message);
            return res.data;    
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || 
        error.toString();
        toast.error(message);
        return thunkApi.rejectWithValue(message);
        }
    }
)


export const getCarById=createAsyncThunk(
    'car/getcarById',
    async(id,thunkApi)=>{
        try {

            const res=await axios.get(`http://localhost:3000/api/admin/getCarbyid/${id}`,{
                withCredentials:true
            })

            return res.data;
            
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || 
        error.toString();
        toast.error(message);
        return thunkApi.rejectWithValue(message);
        }
    }
)


export const getAllCars=createAsyncThunk(
    "car/getAllCars",
    async (_,thunkApi)=>{
        try {
            const res=await axios.get('http://localhost:3000/api/admin/getCars', {
                withCredentials: true,
            });
            return res.data;    
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || 
        error.toString();
        toast.error(message);
        return thunkApi.rejectWithValue(message);
        }
    }
)

const carSlice=createSlice({
    name:'car',
    initialState:{
        cars:[],
        car:[],
        loading:false,
        error:null,
        message:''
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addCar.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(addCar.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message;
        })
        .addCase(addCar.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(getAllCars.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(getAllCars.fulfilled,(state,action)=>{
            state.loading=false;
            state.cars=action.payload;
        })
        .addCase(getAllCars.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(getCarById.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(getCarById.fulfilled,(state,action)=>{
            state.loading=false;
            state.car=action.payload;
        })
        .addCase(getCarById.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            toast.error(state.error);
        })
        
    }
})




export default carSlice.reducer;
