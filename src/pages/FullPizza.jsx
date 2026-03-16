import React from 'react';
import axios from 'axios';
import { useParams } from "react-router";

const FullPizza = () => {
    let [pizza, setPizza] = React.useState();//ни задано значит андефайнд
    let { id } = useParams();
    // console.log(params)
    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get('https://68dd22fe7cd1948060ac902b.mockapi.io/items/' + id);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы')
            }
        }
        fetchPizza()//вызываем функцию для запроса
    }, [])
    //если пицца не загрузилась не рендери разметку,не будет показывать андефайнд так за загрузка
    if(!pizza){
        return 'Загрузка...'
    }
    return (
        <div className='container'>
            <img src={pizza.imageUrl} alt="" />
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    )
}

export default FullPizza;
