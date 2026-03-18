
import React from 'react';
// import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort } from '../redux/slices/filterSlice'

//указываем типы
type SortItem = {
  name: string;
  sortProperty: string;
};

export const sortlist: SortItem[] = [//указываем имеенно массив
  { name: 'популярность(DECK)', sortProperty: 'rating' },
  { name: 'популярность(ASC)', sortProperty: '-rating' },
  { name: 'цене(DECK)', sortProperty: 'price' },
  { name: 'цене(ASC)', sortProperty: '-price' },
  { name: 'алфавиту(DESC)', sortProperty: 'title' },
  { name: 'алфавиту(ASC)', sortProperty: '-title' },
]//рендер списка
// const sortName = list[value].name;

export const Sort = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = React.useRef<HTMLDivElement>(null);//перед по умол нуд или htmdivelem

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);//скройся
  }

  React.useEffect(()=>{})  
  const handleOutsideClick = (event:any) => {
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



// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { setSort } from '../redux/filter/slice';
// import { Sort as SortType, SortPropertyEnum } from '../redux/filter/types';

// type SortItem = {
//   name: string;
//   sortProperty: SortPropertyEnum;
// };

// type PopupClick = MouseEvent & {
//   path: Node[];
// };

// type SortPopupProps = {
//   value: SortType;
// };

// export const sortList: SortItem[] = [
//   { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
//   { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
//   { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
//   { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
//   { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
//   { name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
// ];

// export const Sort: React.FC<SortPopupProps> = React.memo(({ value }) => {
//   const dispatch = useDispatch();
//   const sortRef = React.useRef<HTMLDivElement>(null);

//   const [open, setOpen] = React.useState(false);

//   const onClickListItem = (obj: SortItem) => {
//     dispatch(setSort(obj));
//     setOpen(false);
//   };

//   React.useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const _event = event as PopupClick;

//       if (sortRef.current && !_event.path.includes(sortRef.current)) {
//         setOpen(false);
//       }
//     };

//     document.body.addEventListener('click', handleClickOutside);

//     return () => document.body.removeEventListener('click', handleClickOutside);
//   }, []);

//   return (
//     <div ref={sortRef} className="sort">
//       <div className="sort__label">
//         <svg
//           width="10"
//           height="6"
//           viewBox="0 0 10 6"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg">
//           <path
//             d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
//             fill="#2C2C2C"
//           />
//         </svg>
//         <b>Сортировка по:</b>
//         <span onClick={() => setOpen(!open)}>{value.name}</span>
//       </div>
//       {open && (
//         <div className="sort__popup">
//           <ul>
//             {sortList.map((obj, i) => (
//               <li
//                 key={i}
//                 onClick={() => onClickListItem(obj)}
//                 className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
//                 {obj.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// });

// export default Sort;
