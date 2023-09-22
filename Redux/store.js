import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./Slices/PostSlice";
import authSlice from "./Slices/authSlice";


const store = configureStore({
    reducer:{
        postStore: PostSlice,
        authStore: authSlice
    }
})

export default store