"use strict";

const alerts = document.querySelector(".alerts");

const messages = [
  {
    type: "primary",
    text: "Hello, user!",
    widthClass: "col-6",
    code: 1,
  },
  {
    type: "success",
    text: "Operation completed successfully!",
    widthClass: "col-6",
    code: 2,
  },
  {
    type: "warning",
    text: "Please check your input.",
    widthClass: "col-6",
    code: 3,
  },
  {
    type: "danger",
    text: "Something went wrong!",
    widthClass: "col-6",
    code: 4,
  },
  {
    type: "info",
    text: "You have a new notification.",
    widthClass: "col-6",
    code: 5,
  },
  {
    type: "dark",
    code: 6,
  },
];

// Вызов ф-ции создания инф. сообщения
alerts.append(createAlert());
//-----------------------------------
// Деструктуризация — это способ быстро достать значения из объекта или массива и положить их в отдельные переменные
// Пример:
const students = {
  fname: "Anton",
  age: 21,
  city: "Moscow",
};

const { fname, age, city } = students;
console.log(fname, age, city);

const mess = {
  type: "success",
  color: "red",
  destination: "form",
};

// Можно переименовать переменную и оставлять остаток
const { type: typeCl, ...rest } = mess;
console.log(typeCl, rest);

//-----------------------------------
// Деструктуризация объекта
let text, typeClass, widthClass;
({ text, type: typeClass, widthClass } = messages[0]);
alerts.append(createAlert(text, typeClass, widthClass));

({ text, type: typeClass, widthClass } = messages[1]);
alerts.append(createAlert(text, typeClass, widthClass));

({ text, type: typeClass, widthClass } = messages[2]);
alerts.append(createAlert(text, typeClass, widthClass));

({ text, type: typeClass, widthClass } = messages[3]);
alerts.append(createAlert(text, typeClass, widthClass));

({ text, type: typeClass, widthClass } = messages[4]);
alerts.append(createAlert(text, typeClass, widthClass));

({
  text = "Data is missing!",
  type: typeClass,
  widthClass = "col-6",
} = messages[5]);
alerts.append(createAlert(text, typeClass, widthClass));

// Деструктуризация массива
const [, , successMessage, errorMessage] = messages;
console.log("Success & error messages:", successMessage, errorMessage);

// Знак троеточия
// Остаточные параметры
const { text: successText, ...restSuccess } = successMessage;
console.log("Success message parts:", successText, restSuccess);

const [infoMessage, warningMessage, ...restMessages] = messages;
console.log("Message parts:\n", infoMessage, warningMessage, restMessages);

// Оператор расширения SPREAD
const num = [2, 4, 56, 67, 23, 5];
console.log("max num", Math.max(...num));

// Создание сообщения
function createAlert(
  text = "Test message",
  typeClass = "light",
  widthClass = "col-12",
) {
  return createBase(text, typeClass, widthClass);
}

// Трюки с деструктуризацией
let str1 = "Message 1";
let str2 = "Message 2";

[str1, str2] = [str2, str1];
console.log(str1);

// Умные параметры ф-ций
alerts.append(createAlert(undefined, undefined, "col-8"));
alerts.append(createAlert2(messages[0]));
alerts.append(createAlert2(messages[1]));
alerts.append(createAlert2(messages[2]));
alerts.append(createAlert2(messages[3]));

function createAlert2({
  text = "Test message",
  type: typeClass = "secondary",
  widthClass = "col-4",
  ...restParams
}) {
  console.log(typeClass, "message rest:", JSON.stringify(restParams));
  return createBase(text, typeClass, widthClass);
}

function createBase(text, typeClass, widthClass) {
  const alertWrapper = document.createElement("div");
  alertWrapper.className = widthClass;
  const alert = document.createElement("div");
  alert.className = `alert alert-${typeClass}`;
  alert.innerText = text;
  alertWrapper.append(alert);

  return alertWrapper;
}

// Трюки с ...
// Копирование массива
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [...arr1];

arr2.splice(3);
console.log(arr1);
console.log(arr2);

// Поверхностное клонирование объекта
const obj1 = { name: "John Smith", age: 35 };
const obj2 = { ...obj1 };
obj2.name = "Toni Tsey";

console.log(obj1.name);
console.log(obj2.name);
