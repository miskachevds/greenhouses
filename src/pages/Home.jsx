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

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = React.useCallback((idx) => {
        dispatch(setCategoryId(idx));
    }, [dispatch]); // Добавлен dispatch в зависимости

    const onChangePage = React.useCallback((page) => {
        dispatch(setCurrentPage(page));
    }, [dispatch]); // Добавлен dispatch в зависимости

    const fetchPizzas = React.useCallback(() => {
        setIsLoading(true);
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `categoryId=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios
            .get(`https://68dd22fe7cd1948060ac902b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((response) => {
                setItems(response.data);
                setIsLoading(false);
            })
            // .catch((error) => {
            //     console.error('Axios error:', error);
            //     setItems([]);
            //     setIsLoading(false);
            // });
        window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage, dispatch]); // Добавлены все зависимости

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
            fetchPizzas();
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
