
//новый с алиса gpt
import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
  const { sortBy, order, category, search, currentPage } = params;
  const { data } = await axios.get(//дождись выполнения запроса,запрос стал синхронным,изнач аксиос дел асинхронный запрос
    `https://68dd22fe7cd1948060ac902b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
  );
  return data
})

const initialState = {
  items: [],//нач состояние
  status: 'loading',//loading/succes/error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {//получит стэит и действие 
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status='loading';
        state.items = []
        // console.log('идет отправка');
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        // console.log('все ок');
        state.items = action.payload; // Сохраняем данные
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        // console.log('была ошибка');
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzaData = (state) => state.pizza;//селектор для удобного использования более короткий

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;



// //не нашел ошибку
// import axios from 'axios';
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// export const fetchPizzas = createAsyncThunk('pizza/fetchPizzaStatus', async (params) => {
//   const { sortBy, order, category, search, currentPage } = params;
//   const { data } = await axios.get(//дождись выполнения запроса,запрос стал синхронным,изнач аксиос дел асинхронный запрос
//     `https://68dd22fe7cd1948060ac902b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
//   );
//   return data
// })

// const initialState = {
//   items: [],//нач состояние
//   status: 'loading',//loading/succes/error
// };

// const pizzaSlice = createSlice({
//   name: 'pizza',
//   initialState,
//   reducers: {
//     setItems(state, action) {//получит стэит и действие 
//       state.items = action.payload;
//     },
//   },
//   extraReducers: {
    
//       [fetchPizzas.pending]: (state) => {
//         state.status='loading';
//         state.items = []
//         // console.log('идет отправка');
//       },
//       [fetchPizzas.fulfilled]: (state, action) => {
//         // console.log('все ок');
//         state.items = action.payload; // Сохраняем данные
//         state.status = 'success';
//       },
//       [fetchPizzas.rejected]: (state) => {
//         // console.log('была ошибка');
//         state.status = 'error';
//         state.items = [];
//       },
//   },
// });

// export const { setItems } = pizzaSlice.actions;

// export default pizzaSlice.reducer;