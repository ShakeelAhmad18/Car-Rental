import { createSlice } from "@reduxjs/toolkit";
import { differenceInDays } from 'date-fns';

const initialState = {
  selectedCar: null,         // full car object
  pickupDate: null,
  returnDate: null,
  rentalDays: 0,
  city: null,
  stateCode: null,            // city for pickup
  insurancePlan: null,       // full insurance object
  extraServices: [],         // array of selected extra services

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
    setInsurancePlan: (state, action) => {
      state.insurancePlan = action.payload;
      const price = action.payload?.daily_price || 0;
      state.insuranceTotal = price * state.rentalDays;
    },
    addExtraService: (state, action) => {
      const exists = state.extraServices.find(s => s._id === action.payload._id);
      if (!exists) {
        state.extraServices.push(action.payload);
        state.extraServiceTotal += action.payload.daily_price * state.rentalDays;
      }
    },
    removeExtraService: (state, action) => {
      const serviceId = action.payload;
      const service = state.extraServices.find(s => s._id === serviceId);
      if (service) {
        state.extraServices = state.extraServices.filter(s => s._id !== serviceId);
        state.extraServiceTotal -= service.daily_price * state.rentalDays;
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
      state.subTotal = state.basePrice + state.tax + state.insuranceTotal + state.extraServiceTotal;
    },
    resetBooking: () => initialState
  }
});



export const {
  setCar,
  setDates,
  setInsurancePlan,
  addExtraService,
  removeExtraService,
  setCity,
  calculateSubTotal,
  resetBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;
