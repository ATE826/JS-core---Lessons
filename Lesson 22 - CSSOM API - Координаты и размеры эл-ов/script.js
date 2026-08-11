"use strict";

// Итоговые (вычисленные) CSS-стили элемента.
const li = document.querySelector("li");
console.log(getComputedStyle(li));

const text = document.querySelector(".text");
const alert = document.querySelector(".alert");

const offsetMetricBtn = document.querySelector(".btn-primary");
const clientMetricBtn = document.querySelector(".btn-secondary");
const scrollMetricBtn = document.querySelector(".btn-dark");
const windowMetricBtn = document.querySelector(".btn-outline-primary");
const windowCoordsBtn = document.querySelector(".btn-outline-secondary");
const pageCoordsBtn = document.querySelector(".btn-outline-dark");

offsetMetricBtn.addEventListener("click", offsetMetricHandler);
clientMetricBtn.addEventListener("click", clientMetricHandler);
scrollMetricBtn.addEventListener("click", scrollMetricHandler);
windowMetricBtn.addEventListener("click", windowMetricHandler);
windowCoordsBtn.addEventListener("click", windowCoordsHandler);
pageCoordsBtn.addEventListener("click", pageCoordsHandler);

function addMetric(name, value) {
  const p = document.createElement("p");
  p.className = "mb-1";
  p.innerHTML = `<span class="fw-bold">${name}</span>: ${value};"`;
  alert.append(p);
}

function offsetMetricHandler() {
  alert.innerHTML = "";
  addMetric(
    "offsetParent",
    `{${text.offsetParent.tagName} (${text.offsetParent.className})`,
  );
  addMetric("offsetTop", `${text.offsetTop}px`);
  addMetric("offsetLeft", `${text.offsetLeft}px`);
  addMetric("offsetWidth", `${text.offsetWidth}px`);
  addMetric("offsetHeight", `${text.offsetHeight}px`);
}

function clientMetricHandler() {
  alert.innerHTML = "";
  addMetric("clientTop", `${text.clientTop}px`);
  addMetric("clientLeft", `${text.clientLeft}px`);
  addMetric("clientWidth", `${text.clientWidth}px`);
  addMetric("clientHeight", `${text.clientHeight}px`);
}

function scrollMetricHandler() {
  alert.innerHTML = "";
  addMetric("scrollTop", `${text.scrollTop}px`);
  addMetric("scrollLeft", `${text.scrollLeft}px`);
  addMetric("scrollWidth", `${text.scrollWidth}px`);
  addMetric("scrollHeight", `${text.scrollHeight}px`);
}
// learn.javascript.ru
//Метрики окна браузера и док-та
// offsetHeight — показывает видимую высоту элемента.
// scrollHeight — показывает полную высоту содержимого, даже той части, которую сейчас не видно из-за прокрутки.
const scrollHeight = Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.offsetHeight,
  document.documentElement.offsetHeight,
  document.body.clientHeight,
  document.documentElement.clientHeight,
);

// documentElement это сам HTML
function windowMetricHandler() {
  alert.innerHTML = "";
  addMetric(
    "documentElement.clientWidth",
    `${document.documentElement.clientWidth}px`,
  );
  addMetric(
    "documentElement.clientHeight",
    `${document.documentElement.clientHeight}px`,
  );
  addMetric(
    "documentElement.scrollWidth",
    `${document.documentElement.scrollWidth}px`,
  );
  addMetric(
    "documentElement.scrollHeight",
    `${document.documentElement.scrollHeight}px`,
  );
  addMetric("window.pageYOffset", `${window.pageYOffset}px`);
  addMetric("window.pageXOffset", `${window.pageXOffset}px`);
  // одно и то же с верхним
  addMetric("window.scrollY", `${window.scrollY}px`);
  addMetric("window.scrollX", `${window.scrollX}px`);
}

function windowCoordsHandler() {
  alert.innerHTML = "";
  // Получаем координаты
  const elemCoords = text.getBoundingClientRect();
  addMetric("x (left)", `${elemCoords.x}px (${elemCoords.left}px)`);
  addMetric("y (top)", `${elemCoords.y}px (${elemCoords.top}px)`);
  addMetric("width", `${elemCoords.width}px`);
  addMetric("height", `${elemCoords.height}px`);
  addMetric("bottom", `${elemCoords.bottom}px`);
  addMetric("right", `${elemCoords.right}px`);
}

function getPageCoords(elem) {
  const box = elem.getBoundingClientRect();
  return {
    top: box.top + window.scrollY,
    right: box.right + window.scrollX,
    bottom: box.bottom + window.scrollY,
    left: box.left + window.scrollX,
  };
}

function pageCoordsHandler() {
  alert.innerHTML = "";
  const elemCoords = getPageCoords(text);
  addMetric("x (left)", `${elemCoords.x}px`);
  addMetric("y (top)", `${elemCoords.y}px`);
  addMetric("right", `${elemCoords.right}px`);
  addMetric("bottom", `${elemCoords.bottom}px`);
}

// Координаты мыши и указателя

document.addEventListener("click", clickHandler);

function clickHandler(event) {
  // Относительно окна браузера
  console.log("X:", event.clientX, "| Y:", event.clientY);
  // Относительно документа
  console.log("X:", event.pageX, "| Y:", event.pageY);
}

// Метод elementFromPoint(x, y) - возвращает самый глубоко вложенный эл-т в окне, находящийся по координатам (x, y)

// Центр экрана
// const centerX = document.documentElement.clientWidth / 2;
// const centerY = document.documentElement.clientHeight / 2;

const centerX = 373;
const centerY = 211;

// Эл-т в центре экрана
const el = document.elementFromPoint(centerX, centerY);

// Тэг эл-та в центре экрана
console.log(el.tagName);

// Относительное позиционирование эл-тов

const list = document.querySelector(".list-group");
list.addEventListener("click", listClickHandler);

function listClickHandler(event) {
  if (event.target.tagName != "SPAN") {
    if (event.target.querySelector("span") == null) {
      const currentLi = event.target;
      const span = document.createElement("span");
      span.className = "position-absolute fs-4";
      span.innerHTML = "&#9745";
      span.style.right = "20px";
      currentLi.append(span);
      span.style.top = (currentLi.clientHeight - span.clientHeight) / 2 + "px";
    }
  } else event.target.remove();
}
