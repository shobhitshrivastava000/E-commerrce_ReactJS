import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "./Slices/CartSlice";
import {userSlice} from "./Slices/UserSlice";
import {CurrentUserSlice} from "./Slices/CurrentUserSlice";


export const store = configureStore({
    reducer:{
        users: userSlice.reducer,
        currentUser: CurrentUserSlice.reducer,
        cart: CartSlice.reducer,
      
    }
});