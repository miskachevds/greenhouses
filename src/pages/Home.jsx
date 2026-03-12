import React from 'react';
import axios from 'axios';
import Categories from '../components/Categories';
import Sort, { sortlist } from '../components/Sort';
import PizzaBlock from '../components/PizzaPlock/PizzaBlock';
import Skeleton from '../components/PizzaPlock/Skeleton';
import Pagination from '../components/Pagination/Pagination.jsx';
import { SearchContext } from '../App.js';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzaSlice.js';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const items = useSelector((state) => state.pizza.items);
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
    
    const { searchValue } = React.useContext(SearchContext);
    // const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = React.useCallback((idx) => {
        dispatch(setCategoryId(idx));
    }, [dispatch]); // Добавлен dispatch в зависимости

    const onChangePage = React.useCallback((page) => {
        dispatch(setCurrentPage(page));
    }, [dispatch]); // Добавлен dispatch в зависимости

    const getPizzas = React.useCallback(async () => {//родительская функция
        setIsLoading(true);

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `categoryId=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        //в промисах отлавливание ошибок .then .catch
        //    axios//дождись выполнения запроса,запрос стал синхронным,изнач аксиос дел асинхронный запрос
        //     .get(`https://68dd22fe7cd1948060ac902b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        //     .then((response) => {//используем промисы это успешный ответ от бэка
        //       setItems(response.data);
        //       setIsLoading(false);
        //       console.log(66666)
        //     }).catch((err)=>{//отловить ошибка
        //         setIsLoading(false);//даже если ошибка завершить загрузку
        //         console.log(err, 'axios error')
        //     })

        // try {//если код выполниться
        //     const {data} = await axios.get(//дождись выполнения запроса,запрос стал синхронным,изнач аксиос дел асинхронный запрос
        //         `https://68dd22fe7cd1948060ac902b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        //     );
        //     dispatch(setItems(data))//диспатчем закидываем массив данных в редакс,деструктуризацией сразу кидаем data вместо сохранения в переменную
        //     // setItems(response.data);
        //     // console.log(66666)
        // } catch (error) {
        //     setIsLoading(false);//остановить загрузку
        //     console.log('error', error)//вывод сообщения
        //     alert('ошибка при получении пицц')
        // } finally {
        //     setIsLoading(false);//не важно успех или ошибка-останови загрузку
        // }

        //если код выполниться
        try {//дай данные и сразу сохрани+передаем параметры
            dispatch(
                fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage,
            })
        );
            
        } catch (error) {
            console.log('error', error)//вывод сообщения
            alert('ошибка при получении пицц')
        } finally {
            setIsLoading(false);//не важно успех или ошибка-останови загрузку
        }

        window.scrollTo(0, 0);//делай остальное
    }, [categoryId, sort.sortProperty, searchValue, currentPage, dispatch]);// Добавлены все зависимости

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortlist.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
        }
    }, [dispatch, setFilters]);

    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage, fetchPizzas]); // Добавлен fetchPizzas в зависимости

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage, navigate]); // Добавлен navigate в зависимости


    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas}
            </div>
            <Pagination onChangePage={onChangePage} /> {/* Передаём onChangePage напрямую */}
        </div>
    );
};

export default Home;
