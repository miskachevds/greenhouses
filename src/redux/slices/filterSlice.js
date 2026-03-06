import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  categoryId: 0,//начальное состояние для категорий
  sort: {//начальное для сортировки
    name: "популярности",
    sortProperty: "rating",
  }
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {//получит стэит и действие
      state.categoryId = action.payload;//получ число катег будет храниться в payload
    },
    setSort(state, action) {//получит стэит и действие
      state.sort = action.payload;
    },
  },
});

export const { setCategoryId,setSort } = filterSlice.actions;

export default filterSlice.reducer;