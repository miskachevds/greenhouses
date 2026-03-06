import React from 'react';

import axios from 'axios';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaPlock/PizzaBlock'
import Skeleton from '../components/PizzaPlock/Skeleton';
import Pagination from '../components/Pagination/Pagination.jsx';
import { SearchContext } from '../App.js';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';//метод меняет сосотояние

const Home = () => {
    const { categoryId, sort } = useSelector((state) => state.filter);//+categoryId начальное состояние категорий,сорт
    const dispatch = useDispatch()//через диспатч передаем категорию 0,1,2
    // const sortType = useSelector((state)=>state.filter.sort.sortProperty);

    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = React.useState([]);//изначально пустые данные,
    const [isLoading, setIsLoading] = React.useState(true);//если идет загрузка,флаг тру
    // const [categoryId, setCategoryId] = React.useState(0);//состояние из категорий
    const [currentPage, setCurrentPage] = React.useState(1);//для паддинга
    // const [sortType, setSortType] = React.useState({
    //         name: "популярности",
    //         sortProperty: "rating",
    //     })

    const onChangeCategory = (id) => {//когда меняем категор,вызываем dispatch
        dispatch(setCategoryId(id))//в диспатч передаем метод для смены состояния+id
        // console.log(id)
    };

    React.useEffect(() => {//не получает значение,получает функцию,кот вызывает когда произойдет какой то эффект
        setIsLoading(true)//чтобы подгружались скилетоны

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asс' : 'desc';
        const category = categoryId > 0 ? `categoryId=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        // fetch(
        //     `https://68dd22fe7cd1948060ac902b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `,
        // )

        //     .then(response => {//когда отправили запрос,тогда ждем
        //         return response.json();//возвращаем и преобразовываем в json
        //     })
        //     .then((data) => {//тогда,сохраняем всю инф в дата
        //         setItems(data);//потом меняем состояние и подгружаем сет,состояние поменялось идет перезагрузка и снова запрос данных поэтому необходимо запр один раз юз эффектом
        //         setIsLoading(false);//скажи что бы загрузка завершилась
        //         // console.log(data)
        //     })

        axios
            .get(`https://68dd22fe7cd1948060ac902b.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search} `,
            )
            .then((response)=>{
                setItems(response.data);
                setIsLoading(false);
            })
        window.scrollTo(0, 0);
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);//пустой массив=вызвать один раз
    //флаг,как происходят изм обновлять запр

    //рендер массива пицц для сокращения кода в константу
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

    //пример кода поиска для статики
    // const pizzas = items.filter(obj=>{//перед тем как рендерить пиццы,сделаем проверку
    //     if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){//и титл и поиск в нижн регистр
    //         return true;
    //     }
    //     return false;
    // }).map((obj) => <PizzaBlock key={obj.id} {...obj} />)

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
            <Pagination onChangePage={(number) => setCurrentPage(number)} />

        </div>
    );
}
export default Home;
//если идет загрузка,созд 6 андефайнд и замени на скелетон,далее подгружай items
//когда сделаю клик,нужно получить index
//здесь фильтруем пиццы локально js ом