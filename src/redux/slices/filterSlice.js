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
    setSearchValue(state, action) {//получит стэит и действие
      state.searchValue = action.payload;//получ число катег будет храниться в payload
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

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;

export const selectCartItemById = (id)=>(state) => state.cart.items.find(obj=>obj.id === id)

export const { setCategoryId,setSort,setCurrentPage,setFilters,setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;