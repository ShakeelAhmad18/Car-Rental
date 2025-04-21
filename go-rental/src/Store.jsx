import { configureStore } from "@reduxjs/toolkit";
import onwerReducer from "./redux/onwerSlice";
import carReducer from "./redux/carSlice";
import adminReducer from './redux/adminSlice';
import userReducer from './redux/userSlice';
import bookingReducer from './redux/bookingSlice';


const Store = configureStore({
  reducer: {
    onwer:onwerReducer,
    car:carReducer,
    admin:adminReducer,
    user:userReducer,
    booking:bookingReducer
  },
});

export default Store;


