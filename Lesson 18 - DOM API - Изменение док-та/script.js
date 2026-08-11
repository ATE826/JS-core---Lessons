"use strict";

// Добавление обработчиков собтий
const btnSec = document.querySelector(".btn-secondary");
btnSec.onclick = function () {
  alert("Hello from secondary btn!");
};

console.log(
  "onclick DOM property:",
  document.querySelector(".btn-primary").onclick,
);

// AddEventListener / RemoveEventListener

const btnSuc = document.querySelector(".btn-success");
function btnSuccessHandler() {
  alert("Hello from success button!");
}
btnSuc.addEventListener("mousemove", btnSuccessHandler);

// Отмена действий браузера по умолчанию
// return false
const btnLink = document.querySelector(".btn-warning");
btnLink.onclick = function (event) {
  alert("Link is blocked!");
  console.log("Default prevented:", event.defaultPrevented);
  return false;
};

const btnSub = document.querySelector("[type='submit']");
function btnSubmitHandler(event) {
  event.preventDefault();
  alert("Form submit is blocked");
  console.log("Default prevented:", event.defaultPrevented);
}

btnSub.addEventListener("click", btnSubmitHandler);
