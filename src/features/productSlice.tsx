import { createSlice , PayloadAction } from "@reduxjs/toolkit";

type Product = {
  isAdded : boolean
};

const initialState: Product = {
  isAdded: false
};


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers : {
        isProductAdded : (state , action:PayloadAction<boolean>)=>{
            console.log(state);
            
            state.isAdded = action.payload
        }
    }
})

export default productSlice.reducer;
export const {isProductAdded} = productSlice.actions;
