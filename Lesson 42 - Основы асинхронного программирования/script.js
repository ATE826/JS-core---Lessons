"use strict";

const userForm = document.forms["user-form"];
const formStatus = document.getElementById("form-status");

const warnAlert = document.querySelector(".alert-warning");
const contextAlert = document.getElementById("this-context");

// АСИНХРОННАЯ ФУНКЦИЯ
// Ф-ция загрузки скрипта
// function loadScript(src) {
//   const script = document.createElement("script");
//   script.src = src;
//   document.head.append(script);
// }

// Не сработает - функция загрузки скрипта асинсхронна
// loadScript("myscript.js");
// console.log("Num1 from myscript.js:", num1);

//=================================================================================

// ==================== CALLBACK-ФУНКЦИЯ ====================

// Callback — это функция, которую передали другой
// функции для вызова в определённый момент
//
// Она вызывается позже, когда произойдёт определённое событие
// или завершится какая-либо операция.
//
// В данном примере loadScript() загружает внешний JavaScript-файл,
// а callback вызывается после завершения загрузки:
// - callback(null, script) — если загрузка успешна;
// - callback(error) — если произошла ошибка.
//
// Callback нужен, чтобы выполнить код ПОСЛЕ завершения
// асинхронной операции и получить её результат или ошибку.

function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;

  // onload срабатывает, когда скрипт успешно загрузился.
  // Передаём null вместо ошибки и сам script.
  script.onload = () => callback(null, script);

  // onerror срабатывает, если скрипт не удалось загрузить.
  // Передаём объект ошибки.
  script.onerror = () => callback(new Error(`Failed to load script: ${src}`));

  document.head.append(script);
}

// Передаём callback-функцию вторым аргументом.
//
// Она будет вызвана после того, как myscript.js
// либо загрузится, либо завершится ошибкой.

loadScript("myscript.js", function (error, script) {
  // Если произошла ошибка — error будет содержать объект Error.
  if (error) {
    // Обрабатываем ошибку.
    console.warn(error.message);
  } else {
    // Если ошибки нет, значит скрипт успешно загрузился.
    // Поэтому num1 уже доступна из myscript.js.
    console.log("Num1 from myscript.js:", num1);
  }
});

// ФУНКЦИИ ПЛАНИРОВАНИЯ
userForm.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(event) {
  event.preventDefault();
  const name = userForm.name.value;
  const age = userForm.age.value;
  if (name && age) {
    warnAlert.style.display = "none";
    userForm.style.display = "none";
    showResult("success");
  } else {
    showResult("danger");
  }
}

function showResult(result) {
  formStatus.classList.remove("alert-success", "alert-danger");
  formStatus.classList.add(`alert-${result}`);
  formStatus.innerText =
    result == "success"
      ? "Form has been sent successfully"
      : "Please, enter correct data";
  setTimeout(hideResult, 2500);
}

function hideResult() {
  formStatus.style.opacity = 0;
}
// Мигание предупреждение
const timerId = setInterval(blinkWarning, 3000);

function blinkWarning() {
  warnAlert.style.opacity = 0;

  setTimeout(() => {
    warnAlert.style.opacity = 1;
  }, 1500);
}

// Отключение мигания предупреждения
userForm["stop-blink"].onclick = () => clearInterval(timerId);

// Вложенный setTimeout
let delay = 1000;

let loopTimerId = setTimeout(function request() {
  if (!userForm.name.value) {
    delay += 1000;
    console.log("Delay time:", delay);
  }
  showFormData();
  loopTimerId = setTimeout(request, delay);
});

function showFormData() {
  console.log(`Name: ${userForm.name.value}`);
  console.log(`Age: ${userForm.age.value}`);
}

// setTimeout с нулевой задержкой
setTimeout(() => console.log("After"));
console.log("Before");

// Контекст this в ф-ции планирования
contextAlert.classList.add("alert-info");
const user = {
  name: "Toni",
  printName() {
    contextAlert.innerText = this.name;
  },
};

// user.printName();

// Не сработает this = window
setTimeout(user.printName, 2000);

// Решение 1 - оборачивание callback ф-ции в анонимную ф-цию
setTimeout(() => user.printName(), 2000);

// Решение 2 - привязка контекста методом bind()
const printName = user.printName.bind(user);
setTimeout(printName, 4000);
