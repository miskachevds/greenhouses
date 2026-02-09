
import './scss/app.scss'
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
// import { useState } from 'react';
import React from 'react';

import pizzas from './assets/pizzas.json';
// console.log(pizzas)

function App() {
  const [items,setItems] = useState([]);//изначально пустые данные,

  React.useEffect();

  fetch('https://68dd22fe7cd1948060ac902b.mockapi.io/items')
    .then(response => {//когда отправили запрос,тогда ждем
      return response.json();//возвращаем и преобразовываем в json
    })
    .then((data) => {//тогда,сохраняем всю инф в дата
      setItems(data);//потом меняем состояние и подгружаем сет,состояние поменялось идет перезагрузка и снова запрос данных поэтому необходимо запр один раз юз эффектом
      // console.log(data)
    })

  return (
    <div className="wrapper">

      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />

          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map((obj) => (
                <PizzaBlock key={obj.id} {...obj} />

              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
