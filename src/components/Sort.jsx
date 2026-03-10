
import React from 'react';
// import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSort } from '../redux/slices/filterSlice'

export const sortlist = [
  { name: 'популярность(DECK)', sortProperty: 'rating' },
  { name: 'популярность(ASC)', sortProperty: '-rating' },
  { name: 'цене(DECK)', sortProperty: 'price' },
  { name: 'цене(ASC)', sortProperty: '-price' },
  { name: 'алфавиту(DESC)', sortProperty: 'title' },
  { name: 'алфавиту(ASC)', sortProperty: '-title' },
]//рендер списка
// const sortName = list[value].name;

export const Sort = React.memo(({ value }) => {
  const sort = useSelector((state) => state.filter.sort);
  const dispatch = useDispatch();
  const sortRef = React.useRef(null);

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);//скройся
  }

  const handleOutsideClick = event => {
    if (!sortRef.current.contains(event.target)) {
      setOpen(false); // Скрываем меню, если клик вне элемента
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);//Мы добавляем глобального слушателя событий клика на всю страницу
    return () => {                                              
      document.body.removeEventListener('click', handleOutsideClick);//Когда произойдёт клик на любом месте страницы, выполнится наша функция handleOutsideClick, проверяя, попал ли клик внутрь меню.
    };
  }, []);

  // React.useEffect(()=>{
  //   const handleClickOutside = (event)=>{
  //   if(!event.path.includes(sortRef.current)){
  //     setOpen(false);
  //     console.log('click outside')
  //   }
  //   }

  //   document.body.addEventListener('click',handleClickOutside)
  // },[]);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>

        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>
          {sort?.name || 'Выберите сортировку'}
        </span>
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {sortlist.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={sort?.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;