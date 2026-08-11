"use strict";

// События мыши (клики)
const btnPrimary = document.querySelector(".btn-primary");
const list1Items = document.querySelectorAll("#list-1 .list-group-item");

btnPrimary.onmousedown = function (event) {
  console.log(`Event type - ${event.type}\nMouse button - ${event.button}`);
  switch (event.button) {
    case 0:
      list1Items[0].classList.toggle("bg-primary-subtitle"); // toggle() — это метод classList, который добавляет класс элементу, если его нет, и удаляет, если он уже есть.
      break;

    case 1:
      list1Items[1].classList.toggle("bg-primary-subtitle");
      break;

    case 2:
      list1Items[2].classList.toggle("bg-primary-subtitle");
      break;

    case 3:
      list1Items[3].classList.toggle("bg-primary-subtitle");
      break;

    case 4:
      list1Items[4].classList.toggle("bg-primary-subtitle");
      break;
  }
};

btnPrimary.onmouseup = function (event) {
  console.log(`Event type - ${event.type}\nMouse button - ${event.button}`);
};

btnPrimary.onclick = function (event) {
  console.log(`Event type - ${event.type}\nMouse button - ${event.button}`);
};

btnPrimary.ondblclick = function (event) {
  console.log(`Event type - ${event.type}\nMouse button - ${event.button}`);
};

btnPrimary.oncontextmenu = function (event) {
  console.log(`Event type - ${event.type}\nMouse button - ${event.button}`);
};

// События мышь + клавиатура
const btnSec = document.querySelector(".btn-secondary");

btnSec.onclick = function (event) {
  if (event.shiftKey) {
    alert(`Event ShiftKey - ${event.shiftKey}`);
  }
};

// События мыши при перемещении курсора
const list2 = document.getElementById("list-2");

list2.onmouseover = function (event) {
  if (event.target.closest("ul").id == "list-2") {
    // closest() — это метод, который ищет ближайший родительский элемент, подходящий под указанный CSS-селектор.
    event.target.classList.add("bg-primary", "text-white");
  }
};

list2.onmouseout = function (event) {
  if (event.target.closest("ul").id == "list-2") {
    // event.target.closest("ul").id - делегирование
    // closest() — это метод, который ищет ближайший родительский элемент, подходящий под указанный CSS-селектор.
    event.target.classList.remove("bg-primary", "text-white");
  }
};

list2.onmouseenter = function (event) {
  console.log("Inside list");
  console.log(`Event target tag: ${event.target.tagName}`);
  console.log(`Event relatedTarget tag: ${event.relatedTarget.tagName}`); // event.relatedTarget — это элемент, с которого мышь пришла или на который ушла при переходе.
};

list2.onmouseleave = function (event) {
  console.log("Outside list");
  console.log(`Event target tag: ${event.target.tagName}`);
  console.log(`Event relatedTarget tag: ${event.relatedTarget.tagName}`); // event.relatedTarget — это элемент, с которого мышь пришла или на который ушла при переходе.
};

document.addEventListener("keydown", pressKeyDown);

function pressKeyDown(event) {
  if (event.code == "KeyA") {
    // KeyA - так браузер записывает нажатие клавиши A
    alert("A Key down!");
  }
}

document.addEventListener("keyup", pressKeyUp);
function pressKeyUp(event) {
  if (event.code == "KeyT") {
    alert("T Key up!");
  }
}

// pointer (указатель) — это любое устройство, которым пользователь указывает на элементы страницы (Мышь/палец/стилус)

const list3 = document.getElementById("list-3");
const list3Items = list3.getElementsByClassName("list-group-item");
const nextBtn = document.querySelector(".btn-success");
const prevBtn = document.querySelector(".btn-warning");
let currentIdx = 0;

nextBtn.addEventListener("pointerup", nextBtnHandler);
prevBtn.addEventListener("pointerup", prevBtnHandler);

function nextBtnHandler(event) {
  list3Items[currentIdx].classList.remove("bg-success-subtle");
  console.log(`Event pointer type - ${event.pointerType}`);
  if (++currentIdx > 4) currentIdx = 0;
  list3Items[currentIdx].classList.add("bg-success-subtle");
}

function prevBtnHandler(event) {
  list3Items[currentIdx].classList.remove("bg-success-subtle");
  console.log(`Event pointer type - ${event.pointerType}`);
  if (--currentIdx < 0) currentIdx = 4;
  list3Items[currentIdx].classList.add("bg-success-subtle");
}
