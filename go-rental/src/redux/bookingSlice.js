import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { differenceInDays } from 'date-fns';
import toast from "react-hot-toast";

const initialState = {
  selectedCar: null,         // full car object
  pickupDate: null,
  returnDate: null,
  rentalDays: 0,
  isLoading: false,
  error: null,
  services: [],          // array of extra services
  deliveryFee: 0,       // delivery fee (if applicable)
  city: null,
  deliveryLocation: null, // delivery location (e.g., airport, city center)
  pickupLocation: null,     // pickup location (e.g., airport, city center)
  returnLocation: null,      // return location (e.g., airport, city center)
  stateCode: null,            // city for pickup
  insurancePlan: null,       // full insurance object
  extraServices: [],         // array of selected extra services
  pickupType: null,         // pickup type (e.g., self, delivery)
  basePrice: 0,
  insuranceTotal: 0,
  extraServiceTotal: 0,
  tax: 0,
  subTotal: 0,
  stateCode: null,           // for calculating tax based on US state
};


const cityToStateMap = {
  "New York": "NY",
  "Los Angeles": "CA",
  "Houston": "TX",
  "Miami": "FL",
  "Chicago": "IL",
  "San Francisco": "CA",
  "Orlando": "FL",
  "Austin": "TX",
  "Dallas": "TX",
  "Buffalo": "NY"
};




const stateTaxRates = {
  CA: 0.10,
  TX: 0.08,
  NY: 0.09,
  FL: 0.07,
  IL: 0.075,
  DEFAULT: 0.06
};



//get extra services
export const getExtraServices=createAsyncThunk(
  'extraServices/bookings',
  async (_,thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3000/api/extraservice/getextraService'); // Replace with your API endpoint
      const data = await response.data;
      return data;
    } catch (error) {

      const message = (error.response && error.response.data && error.response.data.message) || 
                    error.message || 
                    error.toString();
                    toast.error(message);
      return thunkAPI.rejectWithValue(message);

    }
  }
)



const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCar: (state, action) => {
      state.selectedCar = action.payload;
      
    },
    setDates: (state, action) => {
      const { pickupDate, returnDate } = action.payload;
      state.pickupDate = pickupDate;
      state.returnDate = returnDate;
      const days = Math.max(differenceInDays(new Date(returnDate), new Date(pickupDate)), 1);
      state.rentalDays = days;

      if (state.selectedCar) {
        const rentPerDay = state.selectedCar.rentPerkm || 0;
        
        state.basePrice = rentPerDay * days;
      }
    },
    setAddress:(state, action) => {
        const { pickupType } = action.payload;
        state.pickupType = pickupType;
        
        if(pickupType === 'Delivery') {
          state.deliveryFee = 10; 
        }else{
          state.deliveryFee = 0; 
        }

      },
      setDeliveryLocation: (state, action) => {
        const { deliveryLocation, returnLocation} = action.payload;
        state.deliveryLocation = deliveryLocation;
        state.returnLocation=returnLocation;
      },
    setSelfPickupLocation: (state, action) => {
      const { pickupLocation ,returnLocation} = action.payload;
      state.pickupLocation = pickupLocation;
      state.returnLocation = returnLocation;
    },
    setInsurancePlan: (state, action) => {
      state.insurancePlan = action.payload;
      const price = action.payload?.daily_price || 0;
      state.insuranceTotal = price * state.rentalDays;
    },
    addExtraService: (state, action) => {
      state.extraServices.push(action.payload);
      state.extraServiceTotal += action.payload.daily_price * state.rentalDays;
    },
    removeExtraService: (state, action) => {
      const serviceId = action.payload;
      const serviceIndex = state.extraServices.findIndex(
        (service) => service.serviceId === serviceId
      );
      
      if (serviceIndex !== -1) {
        const removedService = state.extraServices[serviceIndex];
        state.extraServices.splice(serviceIndex, 1);
        state.extraServiceTotal -= removedService.daily_price * state.rentalDays;
      }
    },
    setCity: (state, action) => {
      const city = action.payload;
      state.city = city;

      const stateCode = cityToStateMap[city] || null;
      state.stateCode = stateCode;

     const taxRate = stateTaxRates[stateCode] || stateTaxRates.DEFAULT;
     state.tax = state.basePrice * taxRate;
   },
    calculateSubTotal: (state) => {
      state.subTotal = state.basePrice + state.deliveryFee + state.tax + state.insuranceTotal + state.extraServiceTotal;
    },
    resetBooking: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExtraServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExtraServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(getExtraServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
  },

});



export const {
  setCar,
  setDates,
  setInsurancePlan,
  addExtraService,
  removeExtraService,
  setCity,
  calculateSubTotal,
  setAddress,
  resetBooking,
  setDeliveryLocation,
  setSelfPickupLocation,
} = bookingSlice.actions;


export default bookingSlice.reducer;

