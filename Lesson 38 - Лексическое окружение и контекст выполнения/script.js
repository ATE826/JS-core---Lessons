"use strict";

const lightEl = document.querySelector(".light");
const counter1Btn = document.querySelector(".btn-success");
const counter2Btn = document.querySelector(".btn-danger");

const light = "springgreen";

// По факту цвет не изменился
function changeLight() {
  const light = "tomato";
  console.log("light:", light);
  fireLight();
}

function fireLight() {
  lightEl.style.background = light;
}
changeLight();

// // Область видимости переменных
// // scope: global (window)
// const variable = "global";

// function block1() {
//   // scope: block 1
//   console.log("var from block 1:", variable);

//   function block2() {
//     // scope: block 2
//     const variable = "block 2";
//     console.log("var from block 2:", variable);
//   }
//   {
//     // scope: block 3
//     const variable = "block 3";
//     console.log("var from block 3:", variable);
//     if (true) {
//       // scope: block 4
//       const variable = "block 4";
//       console.log("var from block 4:", variable);
//     }
//   }
//   block2();
// }

// block1();

console.log();

// ==================== ЗАМЫКАНИЕ ====================

// getCounter() создаёт отдельную переменную counter
// и возвращает внутреннюю функцию.
// Внутренняя функция сохраняет доступ к переменной counter
// даже после завершения работы getCounter().
// Благодаря этому переменная counter не уничтожается,
// а сохраняет своё значение между вызовами функции.

function getCounter() {
  // Локальная переменная, доступная внутренней функции
  let counter = 0;

  // Возвращаем функцию, которая замыкает переменную counter
  return function () {
    // При каждом вызове увеличиваем counter на 1
    return ++counter;
  };
}

const count1 = getCounter();
counter1Btn.onclick = function () {
  this.previousElementSibling.innerText = count1();
};

const count2 = getCounter();
counter2Btn.onclick = function () {
  this.previousElementSibling.innerText = count2();
};

// Контекст выполнения

const user = {
  name: "Toni",
  age: 21,
  getAge() {
    console.log("Age:", this.age);
  },
};

function getName() {
  console.log("Name:", this.name);
}

// Глобальный контекст this = window
console.dir("this:", this);

// Контекст внутри функции this = undefined (в строгом режиме) / window  (в нестрогом)
// getName();

// Контекст функции-метода объекта: this = obj
user.getAge();

// Привязка контекста
user.getName = getName;

console.log("*** DOT NOTATION ***");
user.getName();

// ==================== BIND ====================
// bind() создаёт НОВУЮ функцию и навсегда привязывает к ней
// указанный объект как значение this.
// При этом функция НЕ вызывается сразу.

const car = {
  name: "BMW",
  prodYear: 2026,
};

const getCarName = getName.bind(car);

// Теперь внутри getCarName() значение this будет указывать на car.
console.log("*** BIND METHOD ***");

getCarName();

// ==================== CALL ====================
// call() сразу вызывает функцию и позволяет вручную указать,
// каким объектом будет являться this.
// Аргументы функции передаются через запятую.

function getInfo(methodName) {
  console.log("Method:", methodName);

  this.getName();
  this.getAge();
}

// Здесь getInfo() сразу вызывается.
// Внутри функции this будет равен объекту user.
// "call" передаётся как обычный аргумент methodName.
getInfo.call(user, "*** CALL ***");

// ==================== APPLY ====================
// apply() работает почти так же, как call():
// он сразу вызывает функцию и позволяет указать значение this.
// Главное отличие — аргументы передаются МАССИВОМ.

getInfo.apply(user, ["*** APPLY ***"]);
