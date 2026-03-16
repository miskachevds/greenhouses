import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  totalPrice: 0,//сумма общая
  items:[]//товары
  
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem(state, action) {//получит стэит и действие 
    //   state.items.push(action.payload);//получ число катег будет храниться в payload
    //   state.totalPrice = state.items.reduce((sum, obj)=>{//подсчет суммы товаров
    //     return obj.price + sum;
    //   },0);
    // },
    addItem(state, action) {//получит стэит и действие 
      const findItem = state.items.find(obj => obj.id===action.payload.id )//если объект нашелся

      if(findItem){//что бы не дублировалось одно и тоже
        findItem.count++;//добавляем счет
      }else{
        state.items.push({//если объекта нет доб в массив 1
            ...action.payload,
            count:1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj)=>{//подсчет суммы товаров
        return (obj.price*obj.count ) + sum;
      },0);
    },
    minusItem(state,action){
        const findItem = state.items.find(obj => obj.id===action.payload )

        if(findItem){
            findItem.count--
        }
    },
    removeItem(state, action) {//
      state.items = state.items.filter(obj => obj.id !== action.payload);//
    },
    clearItems(state) {//
      state.items = [];//
      state.totalPrice = 0;
    },
    
  },
});

export const selectCart = (state)=>state.cart;//более короткая запись для использования

export const { addItem,removeItem,minusItem,clearItems } = cartSlice.actions;

export default cartSlice.reducer;