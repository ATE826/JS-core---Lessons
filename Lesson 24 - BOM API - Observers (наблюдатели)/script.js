"use strict";

// Выбор эл-тов
const page = document.documentElement;
const homeSection = document.querySelector(".home");
const nav = document.querySelector("nav");

const btnChangeTitle = document.querySelector(".btn-dark");
const btnStopWatching = document.querySelector(".btn-outline-secondary");

const sections = document.querySelectorAll("section");
const images = document.querySelectorAll(".image");

const topBtn = document.querySelector(".top-btn");

//----- MUTATION OBSERVER -----
// Объект настроек
const mutationConfig = {
  childList: true,
  subtree: true,
  attributes: true,
};

// Функция callback
function mutationCallback(records, observer) {
  for (let record of records) {
    console.log("Change element:", record.target);
    console.log("Change type:", record.type);
  }
}

// Наблюдатель
const mutationObserver = new MutationObserver(mutationCallback);

// Нанблюдаемые эл-ты
const mutationNode = homeSection;

// Привязка эл-тов к наблюдателю
mutationObserver.observe(mutationNode, mutationConfig);

// Изменение наблюдаемых эл-тов
btnChangeTitle.onclick = function () {
  const h1 = mutationNode.querySelector("h1");
  h1.textContent = "New text!";
  h1.classList.add("text-success");
};

// Остановка наблюдения
btnStopWatching.onclick = function () {
  mutationObserver.disconnect();
};

// ----- INTERSECTION OBSERVER -----
// Объект настроек
const intersectionConfig = {
  root: null,
  threshold: [0.5, 0.8],
};

// Функция callback
function intersectionCallback(records, observer) {
  for (let record of records) {
    if (record.isIntersecting) {
      if (record.target.tagName != "SECTION") {
        record.target.classList.add("animated");

        // Прекращение наблюдения
        observer.unobserve(record.target);
      } else {
        const currentSectionId = record.target.id;
        document.querySelector(".active").classList.remove("active");
        document
          .querySelector(`a[href="#${currentSectionId}"]`)
          .classList.add("active");
        // Скрытие кнопки Top сверху
        topBtn.hidden = currentSectionId == "home";

        if (currentSectionId == "home" && record.intersectionRatio <= 0.8) {
          nav.classList.add("bg-success");
          nav.classList.remove("bg-dark");
        } else if (
          currentSectionId == "home" &&
          record.intersectionRatio > 0.8
        ) {
          nav.classList.remove("bg-success");
          nav.classList.add("bg-dark");
        }
      }
    }
  }
}

// Наблюдатель
const intersectionObserver = new IntersectionObserver(
  intersectionCallback,
  intersectionConfig,
);

// Нанблюдаемые эл-ты
const intersectionNodes = images;

// Привязка эл-тов к наблюдателю
for (let node of intersectionNodes) {
  intersectionObserver.observe(node);
}

// Добавление новых эл-тов в IntersectionObserver
const intersectionNodes2 = sections;
for (let node of intersectionNodes2) {
  intersectionObserver.observe(node);
}

// RESIZE OBSERVER
// Объект настроек (здесь по умолчанию)
const resizeConfig = {};

// Функция callback
function resizeCallback(records, observer) {
  for (let record of records) {
    console.log(`width: ${page.clientWidth}px; height: ${page.clientHeight}`);
    console.log(`width: ${record.contentRect.width}px`);
  }
}

// Наблюдатель
const resizeObserver = new ResizeObserver(resizeCallback);

// Нанблюдаемые эл-ты
const resizeNode = page;

// Привязка эл-тов к наблюдателю
resizeObserver.observe(resizeNode, resizeConfig);
