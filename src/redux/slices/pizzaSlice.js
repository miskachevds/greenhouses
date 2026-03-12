import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus',async (params) => {
    const {sortBy,order,category,search,currentPage} = params;
    const { data } = await axios.get(//дождись выполнения запроса,запрос стал синхронным,изнач аксиос дел асинхронный запрос
    `https://68dd22fe7cd1948060ac902b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
return data
  })

const initialState = {
  items: []//нач состояние
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {//получит стэит и действие 
      state.items = action.payload;
    },
  },
  extraReducers:{
    [fetchUserById.fulfilled]
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;