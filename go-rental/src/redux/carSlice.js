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

//get avaiable cars on user query

export const getAvailableCars=createAsyncThunk(
    "car/getAvailableCars",
     async ({data},thunkApi)=>{
        try {
            const res=await axios.get(`http://localhost:3000/api/admin/available`,{
                params:data,
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


//update car details
export const updateCar=createAsyncThunk(
    'car/updateCar',
    async({id,car},thunkApi)=>{
       
        try {
            const res=await axios.patch(`http://localhost:3000/api/admin/updatecar/${id}`,car, {
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


//Add insurance
export const addInsurance=createAsyncThunk(
    'car/addInsurance',
    async(formData,thunkApi)=>{
        try {
            const res=await axios.post('http://localhost:3000/api/insurance/addInsurance',formData, {
                withCredentials: true
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
    })

    //add extra service

export const addExtraService=createAsyncThunk(
    'car/addExtraService',
    async(formData,thunkApi)=>{
        try {
            const res=await axios.post('http://localhost:3000/api/extraservice/addextraService',formData, {
                withCredentials: true
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
    })



const carSlice=createSlice({
    name:'car',
    initialState:{
        cars:[],
        insurance:[],
        extraService:[],
        car:[],
        loading:false,
        error:null,
        message:''
    },
    reducers: {
  calculatePrices: (state, action) => {
  const pickupDate = new Date(action.payload.pickupDate);
  const returnDate = new Date(action.payload.returnDate);

  const timeDiff = returnDate.getTime() - pickupDate.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;

  state.cars = state.cars?.data?.map(car => ({
    ...car,
    price: car.rentPerkm * dayDiff,
  }));
}

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
        .addCase(getAvailableCars.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(getAvailableCars.fulfilled,(state,action)=>{
            state.loading=false;
            state.cars=action.payload;
        })
        .addCase(getAvailableCars.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            toast.error(state.error);
        })
        .addCase(updateCar.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(updateCar.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message;
        })
        .addCase(updateCar.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            toast.error(state.error);
        })
        .addCase(addInsurance.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(addInsurance.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message;
        })
        .addCase(addInsurance.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            toast.error(state.error);
        })
        .addCase(addExtraService.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(addExtraService.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message;
        })
        .addCase(addExtraService.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
            toast.error(state.error);
        })
    }
})

export const {calculatePrices}=carSlice.actions;

export default carSlice.reducer;
