import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  searchValue: '',
  categoryId: 0,//начальное состояние для категорий
  pageCount:1,
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
    setCurrentPage(state, action) {//получит стэит и действие
      state.currentPage = action.payload;
    },
    setFilters(state,action){
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    }
  },
});

export const { setCategoryId,setSort,setCurrentPage,setFilters } = filterSlice.actions;

export default filterSlice.reducer;