// import { useState } from "react";

const Categories = ({value, onChangeCategory }) => {//если будет клик по категории,передаем родителю в home
  // console.log(value)

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, i) => (
            <li key={i}
              onClick={() => onChangeCategory(i)}
              className={value === i ? 'active' : ''} >
              {categoryName}
            </li>
          ))
        }

      </ul>
    </div>);
}

export default Categories;
//активный индекс храним в value
//при нажатии вызываем функцию onClickCategory(i) передаем i,индекс идет обратно в home
//здесь state нет,он у родитнля