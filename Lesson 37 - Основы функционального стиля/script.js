"use strict";

const form = document.forms.form;
const alert = document.getElementById("alert-content");

// const PI = 3.14;
const PI = Math.PI;

form.addEventListener("submit", formSubmitHandler);

// Плохой стиль написания кода
// function formSubmitHandler(event) {
//   event.preventDefault();

//   const radius = +form.radius.value;
//   alert.innerHTML = "";

//   const circleLength = 2 * PI * radius;
//   const circleArea = PI * radius ** 2;
//   const div1 = document.createElement("div");
//   div1.className = "mb-2";
//   div1.innerText = `Length: ${circleLength}`;
//   alert.append(div1);

//   const div2 = document.createElement("div");
//   div2.className = "mb-2";
//   div2.innerText = `Area: ${circleArea}`;
//   alert.append(div2);
// }

// Хороший стиль написания кода
function formSubmitHandler(event) {
  event.preventDefault();
  const radius = +form.radius.value;
  alert.innerHTML = "";

  addParameter("Length", calcCircleLength(radius, PI));
  addParameter("Area", calcCircleArea(radius, PI));
}

function addParameter(name, value) {
  const div = document.createElement("div");
  div.className = "mb-2";
  div.innerText = `${name}: ${value}`;
  alert.append(div);
}

function calcCircleLength(radius, pi) {
  const circleLength = 2 * pi * radius;
  return circleLength.toFixed(2);
}

function calcCircleArea(radius, pi) {
  const circleArea = pi * radius ** 2;
  return circleArea.toFixed(2);
}

// Имнеованное функц-ое выраж-е
const calcRandom = function calc(max) {
  if (!max) calc(10);
  else {
    const rand = Math.random() * (max + 1);
    console.log("random = ", Math.floor(rand));
  }
};

calcRandom();
calcRandom(100);

const calcPerimetr = new Function("a", "b = a", "return 2*(a + b)");
console.log("perimetr1 = ", calcPerimetr(4));
console.log("perimetr1 = ", calcPerimetr(2, 3));

// Работа с аргументами (В JavaScript функция - это объект)
function calcSum(num1, num2, ...args) {
  // Кол-во обычных аргументов
  console.log("common arguments length: ", calcSum.length);
  // Кол-во доп. аргументов
  console.log("rest arguments length: ", args.length);
  // Кол-во всех аргументов
  console.log("all arguments length: ", arguments.length);
  // Сумма всех аргументов
  return num1 + num2 + args.reduce((a, b) => a + b, 0);
}

console.log("sum1 = ", calcSum(2, 3));
console.log("sum12 = ", calcSum(2, 3, 4, 5, 6, 7));
