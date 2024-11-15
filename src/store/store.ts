import { configureStore } from "@reduxjs/toolkit";
import cartSlice from '../features/cartSlice';
import productReducer from '../features/productSlice'
export const store = configureStore({
    reducer:{
        cart: cartSlice,
        product: productReducer
    }
})