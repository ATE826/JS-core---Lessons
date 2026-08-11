"use strict";

// Верхние эл-ты дерева
const html = document.documentElement;
const head = document.head;
const body = document.body;

console.log(html);
console.log(head);
console.log(body);

console.log("---");

// Дочерние узлы
console.log("body 1st child ", body.firstChild);
console.log("body last child", body.lastChild);
console.log("body all children nodes", body.childNodes);

// Родительские узлы
console.log("body parent node", body.parentNode);

// Соседние узлы
console.log("body next sibling", body.nextSibling);
console.log("body previous sibling", body.previousSibling);

console.log("---");

// Коллекция узлов
const bodyChildNodes = body.childNodes;

console.log("1st bodyChildNode -", bodyChildNodes[0]);
console.log("1st bodyChildNode length -", bodyChildNodes.length);

for (let node of bodyChildNodes) {
  console.log("body Child node -", node);
}

console.log("---");

// Дочерние элементы
console.log("body 1st element child ", body.firstElementChild);
console.log("body last element child", body.lastElementChild);
console.log("body all children elements", body.children);

// Родительские элементы
console.log("body parent element", body.parentElement);

// Соседние элементы
console.log("body next sibling element", body.nextElementSibling);
console.log("body previous sibling element", body.previousElementSibling);
