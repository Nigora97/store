// import { useDispatch, useSelector } from "react-redux";
// import "./App.css";

// function App() {
//   const dispatch = useDispatch();
//   const cash = useSelector((state) => state.cash.cash);
//   const customer = useSelector((state) => state.customer.customer);

//   const addCash = (amount) => {
//     return dispatch({ type: "ADD_CASH", payload: amount });
//   };
//   const getCash = (amount) => {
//     return dispatch({ type: "GET_CASH", payload: amount });
//   };
//   const addCustomer = (name) => {
//     return dispatch({ type: "ADD_CUSTOMER", payload: name });
//   };

//   return (
//     <>
//       {/* Карточка для отображения счета */}
//       <div className="cash-card">
//         <h2>Текущий счет:</h2>
//         <p>{cash} ₽</p>
//       </div>

//       {/* Кнопки */}
//       <div>
//         <button
//           onClick={() => {
//             addCash(Number(prompt("Введите сумму")));
//           }}
//         >
//           Добавить
//         </button>
//         <button
//           onClick={() => {
//             getCash(Number(prompt("Введите сумму")));
//           }}
//         >
//           Снять
//         </button>
//         <button
//           onClick={() => {
//             addCustomer(prompt("Имя студента"));
//           }}
//         >
//           Добавить студента
//         </button>
//       </div>

//       {/* Результат в виде карты */}
//       <div className="result-card">
//         <h2>Список студентов:</h2>
//         {customer.length > 0 ? (
//           customer.map((elem, index) => (
//             <div key={index} className="student-item">{elem}</div>
//           ))
//         ) : (
//           <div>Список студентов пустой</div>
//         )}
//       </div>
//     </>
//   );
// }

// export default App;


import { useDispatch, useSelector } from "react-redux";
import "./App.css"; // Стили для карты

function App() {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customer = useSelector((state) => state.customer.customer);

  const addCash = (amount) => {
    return dispatch({ type: "ADD_CASH", payload: amount });
  };

  const getCash = (amount) => {
    return dispatch({ type: "GET_CASH", payload: amount });
  };

  const addCustomer = (name) => {
    return dispatch({ type: "ADD_CUSTOMER", payload: name });
  };

  // Логика для выбора цвета в зависимости от суммы cash
  const getCardColor = () => {
    if (cash >= 10000) {
      return "gold";
    } else if (cash >= 5000) {
      return "silver";
    } else if (cash >= 1000) {
      return "bronze";
    } else {
      return "none"; // Нет цвета, если сумма меньше 1000
    }
  };

  return (
    <>
      

      {/* Здесь мы применяем класс для стилизации счета */}
      <div className={`balance-card ${getCardColor()}`}>
        <p>Баланс: {cash}</p>
        {getCardColor() === "gold" && <p>Золотая карта</p>}
        {getCardColor() === "silver" && <p>Серебряная карта</p>}
        {getCardColor() === "bronze" && <p>Бронзовая карта</p>}
        {getCardColor() === "none" && <p>У вас нет карты</p>}
      </div>

      <button
        onClick={() => {
          addCash(Number(prompt("Введите сумму для добавления")));
        }}
      >
        Добавить
      </button>
      <button
        onClick={() => {
          getCash(Number(prompt("Введите сумму для снятия")));
        }}
      >
        Снять
      </button>
      <button
        onClick={() => {
          addCustomer(prompt("Имя студента"));
        }}
      >
        Добавить студента
      </button>

      {/* Вывод списка клиентов */}
      {customer.length > 0 ? (
        customer.map((elem, index) => (
          <div
            key={index}
            onClick={() => {
              // Удаление клиента при клике на его имя
              dispatch({ type: "GET_CUSTOMER", payload: elem.id });
            }}
          >
            {elem.name}
          </div>
        ))
      ) : (
        <div>Список студентов пустой</div>
      )}
    </>
  );
}

export default App;
