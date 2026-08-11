"use strict";

const h2 = document.querySelector("h2");

h2.style.marginBottom = "50px";

// Множественное объявление
const heroBlock = document.querySelector("div:nth-of-type(2)"); // второй по счёту <div> среди дочерних элементов одного родителя.
heroBlock.style.cssText = ` 
                            border: 1px solid grey;
                            border-radius: 6px;
                            `;

// Добавить новое объявление
heroBlock.style.cssText += `
                            background-color: rgb(248, 249, 250);
                            `;

// Сброс объявления
heroBlock.style.backgroundColor = "";

// getComputedStyle method
const firstAlert = document.querySelectorAll(".alert")[0];
console.log(
  "first alert background color (style property):",
  firstAlert.style.backgroundColor,
);
console.log(
  "first alert background color (getComputedStyle method):",
  getComputedStyle(firstAlert).backgroundColor,
);

// ClassName (Список всех классов эл-та), classList (+ или - отдельных классов эл-та)
console.log("h2:", h2.className);
console.log("heroBlock:", heroBlock.className);

const h1 = document.querySelector("h1");
h1.className = "py-2";

const secondAlert = document.querySelectorAll(".alert")[1];
console.log("2nd alert classList before:", secondAlert.classList);
secondAlert.classList.remove("alert-secondary");
secondAlert.classList.add("alert-primary");
console.log("2nd alert classList after:", secondAlert.classList);

for (let className of secondAlert.classList) {
  console.log(className);
}
