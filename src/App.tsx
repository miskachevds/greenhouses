import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import './scss/app.scss'
import MainLayout from './layouts/MainLayout.';

// import pizzas from './assets/pizzas.json';
// console.log(pizzas)
// export const SearchContext = React.createContext();

function App() {
  // const [searchValue, setSearchValue] = React.useState('');//так как редакс стате не нужен
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Cart />} />
        <Route path='pizza/:id' element={<FullPizza />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>

  );
}
export default App;
//header будет статично на всех страницах
//пишем Routes там где будет динамика
//сохран данные в searchValue,прокидываем в home для фильтрации