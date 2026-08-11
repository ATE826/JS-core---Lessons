"use strict";

const h1 = document.querySelector("h1");
console.log(h1);

const coll = document.querySelectorAll("ul li");
for (let item of coll) {
  if (item.classList.contains("list-group-item")) {
    // classList - получение всех классов эл-та
    console.log(true);
  } else {
    console.log(false);
  }
}

for (let i of coll) {
  if (i.parentElement.classList.contains("list-group")) {
    console.log(true);
  } else {
    console.log(false);
  }
}
