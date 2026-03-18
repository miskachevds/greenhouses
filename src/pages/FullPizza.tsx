import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";


const FullPizza: React.FC = () => {
    //обозначаем тип данных со свойствами
    let [pizza, setPizza] = React.useState<{
        imageUrl:string;
        title:string;
        price:number;
    }>();
    
    let { id } = useParams();
    const navigate = useNavigate();
    // console.log(params)

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(`https://68dd22fe7cd1948060ac902b.mockapi.io/items/${id}`);
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы')
                navigate('/')
            }
        }
        fetchPizza()//вызываем функцию для запроса
    }, [])
    //если будет underfund рендери загрузку
    if(!pizza){
        return <>Загрузка...</>
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

// import React from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// // Определяем тип данных для пиццы отдельно — так код чище и переиспользуемее
// interface Pizza {
//   imageUrl: string;
//   title: string;
//   price: string;
// }

// const FullPizza: React.FC = () => {
//   // Указываем тип для useState, используя интерфейс Pizza
//   // Инициализируем как undefined — пока данных нет
//   const [pizza, setPizza] = React.useState<Pizza | undefined>(undefined);

//   const { id } = useParams();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     async function fetchPizza() {
//       try {
//         const { data } = await axios.get(`https://68dd22fe7cd1948060ac902b.mockapi.io/items/${id}`);
//         setPizza(data);
//       } catch (error) {
//         alert('Ошибка при получении пиццы');
//         navigate('/');
//       }
//     }
//     fetchPizza();
//   }, [id, navigate]); // Добавляем id и navigate в зависимости useEffect

//   // Если пицца не загрузилась, показываем загрузку
//   if (!pizza) {
//     return <>Загрузка...</>;
//   }

//   return (
//     <div className="container">
//       <img src={pizza.imageUrl} alt={pizza.title} />
//       <h2>{pizza.title}</h2>
//       <h4>{pizza.price} ₽</h4>
//     </div>
//   );
// };

// export default FullPizza;

