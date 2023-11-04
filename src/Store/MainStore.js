import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './UserSlice';
import emailSlice from "./emailSlice";

const store = configureStore({
    reducer:{
        userInfo : UserSlice,
        email: emailSlice,
    }
})

export default store;