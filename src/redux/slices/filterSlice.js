import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  count: 0,//начальное состояние
}

export const counterSlice = createSlice({//создает склад
  name: 'counter',//назв склада
  initialState,//первое состояние 0
  reducers: {
    increment: (state) => {
      
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer