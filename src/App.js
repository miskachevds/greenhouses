import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import './scss/app.scss'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './redux/slices/filterSlice'

// import pizzas from './assets/pizzas.json';
// console.log(pizzas)

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch()

  return (
    <div className="wrapper">

      <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

      {/* <SearchContext.Provider value={{ searchValue, setSearchValue }} >
        <Header />

        <div className="content">
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider> */}

    </div>
  );
}
export default App;
//header будет статично на всех страницах
//пишем Routes там где будет динамика
//сохран данные в searchValue,прокидываем в home для фильтрации