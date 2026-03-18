//вариант алиса 
import React from 'react';
// import axios from 'axios';
import Categories from '../components/Categories';
import Sort, { sortlist } from '../components/Sort';
import PizzaBlock from '../components/PizzaPlock/PizzaBlock';
import Skeleton from '../components/PizzaPlock/Skeleton';
import Pagination from '../components/Pagination/Pagination.js';
// import { SearchContext } from '../App.js';
import {Link} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice.js';


const Home:React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage,searchValue } = useSelector(selectFilter);
  // const { searchValue } = React.useContext(SearchContext);//убираем так как редакс

  const onChangeCategory = React.useCallback((idx:number) => {
    dispatch(setCategoryId(idx));
  }, [dispatch]);

  const onChangePage = React.useCallback((page:number) => {
    dispatch(setCurrentPage(page));
  }, [dispatch]);

  const getPizzas = () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `categoryId=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      //@ts-ignore
      fetchPizzas({ 
        sortBy, 
        order, 
        category, 
        search, 
        currentPage, 
      }));
  };

  React.useEffect(() => {//синхронизацию состояния фильтров с URL, но только после первого рендера.
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  React.useEffect(() => {//поиск
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortlist.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {//выполняет условную загрузку данных
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj:any) => 
    (<Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
      </Link> 
  ));//линк при нажатии переход на id
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
            <h2>Произошла ошибка😕</h2>
            <p>
             К сожалению,не удалось получить пиццы.Попробуйте плвторить попытку позже.
            </p>
        </div>
        ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};


export default Home;


// import React from 'react';
// // import axios from 'axios';
// import Categories from '../components/Categories';
// import Sort, { sortlist } from '../components/Sort';
// import PizzaBlock from '../components/PizzaPlock/PizzaBlock';
// import Skeleton from '../components/PizzaPlock/Skeleton';
// import Pagination from '../components/Pagination/Pagination.jsx';
// import { SearchContext } from '../App.js';

// import { useSelector, useDispatch } from 'react-redux';
// import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
// import qs from 'qs';
// import { useNavigate } from 'react-router-dom';
// import { fetchPizzas } from '../redux/slices/pizzaSlice.js';

// const Home = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const isSearch = React.useRef(false);
//     const isMounted = React.useRef(false);

//     const { items, status } = useSelector((state) => state.pizza);// Добавляем статус загрузки
//     const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

//     const { searchValue } = React.useContext(SearchContext);
//     // const [isLoading, setIsLoading] = React.useState(true);
//     // const [items, setItems] = React.useState([]);

//     const onChangeCategory = React.useCallback((id) => {
//         dispatch(setCategoryId(id));
//     }, []); // Добавлен dispatch в зависимости

//     const onChangePage = (number) => {
//         dispatch(setCurrentPage(number));
//     }; // Добавлен dispatch в зависимости

//     const getPizzas = async () => {//родительская функция
//         // setIsLoading(true);
//         const sortBy = sort.sortProperty.replace('-', '');
//         const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
//         const category = categoryId > 0 ? `categoryId=${categoryId}` : '';
//         const search = searchValue ? `&search=${searchValue}` : '';

//         dispatch(//try/catch не нужен так как ошибки ловим в редакс
//             fetchPizzas({
//                 sortBy,
//                 order,
//                 category,
//                 search,
//                 currentPage,
//             })
//         )//дай данные и сразу сохрани+передаем параметры
//         // setIsLoading(false);
//         window.scrollTo(0, 0);//делай остальное
//     };// Добавлены все зависимости

//     //     try {//если код выполниться
//     //         dispatch(
//     //             fetchPizzas({
//     //                 sortBy,
//     //                 order,
//     //                 category,
//     //                 search
//     //             })
//     //         )//дай данные и сразу сохрани+передаем параметры
//     //         // setIsLoading(false);
//     //     } catch (error) {
//     //         console.log('error', error)//вывод сообщения
//     //         alert('ошибка при получении пицц')
//     //     }

//     //     window.scrollTo(0, 0);//делай остальное
//     // };// Добавлены все зависимости

//     //в промисах отлавливание ошибок .then .catch
//     //    axios//дождись выполнения запроса,запрос стал синхронным,изнач аксиос дел асинхронный запрос
//     //     .get(`https://68dd22fe7cd1948060ac902b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
//     //     .then((response) => {//используем промисы это успешный ответ от бэка
//     //       setItems(response.data);
//     //       setIsLoading(false);
//     //       console.log(66666)
//     //     }).catch((err)=>{//отловить ошибка
//     //         setIsLoading(false);//даже если ошибка завершить загрузку
//     //         console.log(err, 'axios error')
//     //     })

//     // try {//если код выполниться
//     //     const {data} = await axios.get(//дождись выполнения запроса,запрос стал синхронным,изнач аксиос дел асинхронный запрос
//     //         `https://68dd22fe7cd1948060ac902b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
//     //     );
//     //     dispatch(setItems(data))//диспатчем закидываем массив данных в редакс,деструктуризацией сразу кидаем data вместо сохранения в переменную
//     //     // setItems(response.data);
//     //     // console.log(66666)
//     // } catch (error) {
//     //     setIsLoading(false);//остановить загрузку
//     //     console.log('error', error)//вывод сообщения
//     //     alert('ошибка при получении пицц')
//     // } finally {
//     //     setIsLoading(false);//не важно успех или ошибка-останови загрузку
//     // }

//     //если изменили параметры и был первый рендер
//     React.useEffect(() => {
//         // if (isMounted.current) {
//         //     const queryString = qs.stringify({
//         //         sortProperty: sort.sortProperty,
//         //         categoryId,
//         //         currentPage,
//         //     });
//         //     navigate(`?${queryString}`);
//         // }
//         // isMounted.current = true;

        
//         getPizzas();
//     }, [categoryId, sort.sortProperty, searchValue, currentPage]); // Добавлен navigate в зависимости

//     // Парсим параметры при первом рендере
//     // React.useEffect(() => {
//     //   if (window.location.search) {
//     //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
//     //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
//     //     dispatch(
//     //       setFilters({
//     //         searchValue: params.search,
//     //         categoryId: Number(params.category),
//     //         currentPage: Number(params.currentPage),
//     //         sort: sort || sortList[0],
//     //       }),
//     //     );
//     //   }
//     //   isMounted.current = true;
//     // }, []);

//     const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
//     const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

//     return (
//         <div className="container">
//             <div className="content__top">
//                 <Categories value={categoryId} onChangeCategory={onChangeCategory} />
//                 <Sort />
//             </div>
//             <h2 className="content__title">Все пиццы</h2>
//             <div className="content__items">
//                 {status === 'loading' ? skeletons : pizzas}
//             </div>
//             <Pagination currentPage={currentPage} onChangePage={onChangePage} /> {/* Передаём onChangePage напрямую */}
//         </div>
//     );
// };

// export default Home;

//не смог починить старый код сген в алисе
