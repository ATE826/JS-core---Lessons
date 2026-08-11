"use strict";

// Методы выбора эл-тов

const h1 = document.querySelector("h1");
console.log("h1:", h1);

const cards = document.querySelectorAll(".card");
console.log("cards:", cards);

const alert = document.getElementById("alert");
console.log("alert:", alert);

const buttons = document.getElementsByClassName("btn");
console.log("buttons", buttons);

const h3 = document.getElementsByTagName("h3");
console.log("h3:", h3);

const alerts = document.getElementsByName("alert");
console.log("alerts:", alerts);

console.log("---");

// Статические и динамичесские коллекции
const staticCollection = document.querySelectorAll(".row"); // Статическая
const livCcollection = document.getElementsByClassName("row"); // Динамическая

// Коллекции до добавления новой строки
console.log("Static length before:", staticCollection.length);
console.log("Live length before:", livCcollection.length);

// Создание новой строки
const newRow = document.createElement("div");
newRow.className = "row";
document.querySelector(".container").append(newRow);

// Коллекции после добавление новой строки
console.log("Static length after:", staticCollection.length);
console.log("Live length after:", livCcollection.length);

// Методы и св-ва Document/Element
console.log("h1 next sibling el:", h1.nextElementSibling);
console.log("1st row child:", livCcollection[0].children);

// Доп. методы объекта Element
const card0Text = cards[0].querySelector(".card-text");
console.log("card closest el:", card0Text.closest(".card"));

console.log("card contains card text:", cards[0].contains(card0Text));
console.log("card contains card:", cards[0].contains(cards[0]));
console.log(
  "card contains card image:",
  cards[0].contains(cards[0].querySelector(".card-image")),
);

console.log("h1 has py-4 class:", h1.matches(".py-4"));
console.log("alert has disabled attribute:", alert.matches("[disabled"));
