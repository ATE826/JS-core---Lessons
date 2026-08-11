"use strict";

let card = document.querySelector(".card");

card.addEventListener("click", elementViewHandler);

function elementViewHandler(event) {
  let element = event.target;
  alert(
    `Название эл-та:\n${element.tagName}\n\nКласс эл-та:\n${element.className}`,
  );
}
