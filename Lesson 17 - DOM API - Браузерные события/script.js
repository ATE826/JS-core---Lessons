"use strict";

// Родительский эл-т
const row = document.querySelector(".row");

// Создание узлов
const card1Wrapper = document.createElement("div");
card1Wrapper.className = "col-4";

const card1 = document.createElement("div");
card1.className = "alert alert-primary";

const card1Content = document.createTextNode("Card 1 Content");

const comment = document.createComment("New content");

// Вставка узлов на страницу
row.insertAdjacentElement("afterbegin", card1Wrapper);
card1Wrapper.insertAdjacentElement("afterbegin", card1);
card1.insertAdjacentText("afterbegin", card1Content.textContent);

// Сокращённые методы вставки
const card2Wrapper = document.createElement("div");
card2Wrapper.className = "col-4";

const card2 = document.createElement("div");
card2.className = "alert alert-warning";
card2.innerText = "Card 2 Content";

card2Wrapper.append(card2);
row.append(card2Wrapper);
row.prepend(comment);

// Создание клона эл-та
const card3Wrapper = card1Wrapper.cloneNode(true); // если true не указани или указан false, то клонирование без дочерних эл-тов

const card3 = card3Wrapper.querySelector(".alert");
card3.innerText = "Card 3 content";
card3.classList.remove("alert-primary");
card3.classList.add("alert-success");

// Вставка клона на страницу
card2Wrapper.after(card3Wrapper);

card3Wrapper.insertAdjacentHTML(
  "afterend",
  `
            <div class="col-4">
              <div class="alert alert-secondary">
                Card 4 content <span>deleted contend</span>
              </div>
            </div>
`,
);

// объект documentFragment
const fragment = new DocumentFragment();
const ul = document.createElement("ul");
ul.className = "col-4 list-group";
for (let i = 1; i <= 3; i++) {
  let li = document.createElement("li");
  li.className = "list-group-item";
  li.innerText = `Item ${i}`;
  fragment.append(li);
}

ul.append(fragment);
document.querySelector(".container").append(ul);
