import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaPlock/PizzaBlock'
import Skeleton from '../components/PizzaPlock/Skeleton';

const Home = () => {

    const [items, setItems] = React.useState([]);//изначально пустые данные,
    const [isLoading, setIsLoading] = React.useState(true);//если идет загрузка,флаг тру

    const [categoryId, setCategoryId] = React.useState(0);//состояние из категорий
    const [sortType, setSortType] = React.useState(0);//состояние из сортировки

    React.useEffect(() => {//не получает значение,получает функцию,кот вызывает когда произойдет какой то эффект
        fetch('https://68dd22fe7cd1948060ac902b.mockapi.io/items')
            .then(response => {//когда отправили запрос,тогда ждем
                return response.json();//возвращаем и преобразовываем в json
            })
            .then((data) => {//тогда,сохраняем всю инф в дата
                setItems(data);//потом меняем состояние и подгружаем сет,состояние поменялось идет перезагрузка и снова запрос данных поэтому необходимо запр один раз юз эффектом
                setIsLoading(false);//скажи что бы загрузка завершилась
                // console.log(data)
            })
            window.scrollTo(0, 0);
    }, []);//пустой массив=вызвать один раз

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
                <Sort />

            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                        : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
                }
            </div>
        </>
    );
}
export default Home;
//если идет загрузка,созд 6 андефайнд и замени на скелетон,далее подгружай items
//когда сделаю клик,нужно получить index 