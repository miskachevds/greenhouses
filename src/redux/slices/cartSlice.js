import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  totalPrice: 0,//сумма общая
  items:[]//товары
  
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {//получит стэит и действие
      state.items.push(action.payload);//получ число катег будет храниться в payload
    },
    removeItem(state, action) {//
      state.items = state.items.filter(obj => obj.id !== action.payload);//
    },
    clearItem(state) {//
      state.items = [];//
    },
    
  },
});

export const { addItem,removeItem,clearItem } = cartSlice.actions;

export default cartSlice.reducer;