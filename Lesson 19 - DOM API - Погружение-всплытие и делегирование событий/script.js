"use strict";

const table1 = document.getElementById("table-1");
document.querySelector(".btn-primary").onclick = function () {
  alert(table1.caption.innerText);
};

document.querySelector(".btn-secondary").onclick = function () {
  alert(table1.tHead.innerHTML);
};

let currCell;
let curRow;

// Погружение (1) -> элемент (2) -> всплытие (3)
// стадия обработки события
// true - buble
// false - capture
const eventPhase = false;

// Остановка всплытия(погружения)
const stopPropagation = true;

const table1Body = table1.tBodies[0];

for (let tr of table1Body.rows) {
  tr.addEventListener("click", trClickHandler, eventPhase);
  for (let cell of tr.cells) {
    cell.addEventListener("click", cellClickHandler, eventPhase);
  }
}

table1.addEventListener("click", table1ClickHandler, eventPhase);

function trClickHandler(event) {
  console.log(`Click on row: ${this.sectionRowIndex + 1}`);
  if (curRow) curRow.classList.remove("border-secondary");
  curRow = this;
  curRow.classList.add("border-secondary");
}

function cellClickHandler(event) {
  console.log(`Click on cell: ${this.cellIndex + 1}`);
  if (currCell) currCell.classList.remove("bg-secondary", "text-white");
  currCell = this;
  currCell.classList.add("bg-secondary", "text-white");
}

function table1ClickHandler(event) {
  console.log("Click on Table 1");
  console.log(`Event phase ${event.eventPhase}`);
  console.log(`Event target text: ${event.target.innerText}`); //event.target — это элемент, на котором непосредственно произошло событие (например, тот элемент, по которому пользователь кликнул).
  if (stopPropagation) event.stopPropagation();
}

// Делегирование событий — это обработка событий дочерних элементов через один обработчик на их общем родителе с использованием event.target.

const wrapper = document.getElementById("buttons");
wrapper.onclick = function (event) {
  console.log(event.target.id);
};

// Добавление и удаление обработчиков событий
const btnTrack = document.querySelector(".btn-success");
btnTrack.addEventListener("click", btnTrackHandler);

const table2 = document.getElementById("table-2");

function btnTrackHandler() {
  if (this.classList.contains("btn-success")) {
    table2.addEventListener("click", table2ClickHandler);
    this.classList.remove("btn-success");
    this.classList.add("btn-danger");
    this.innerText = "Disable tracking";
  } else {
    table2.removeEventListener("click", table2ClickHandler);
    this.classList.remove("btn-danger");
    this.classList.add("btn-success");
    this.innerText = "Enable tracking";
  }
}

function table2ClickHandler(event) {
  console.log("Click on Table 2");
  console.log(`Event phase ${event.eventPhase}`);
  console.log(`Event target text: ${event.target.innerText}`);
}

function table2ClickHandler(event) {
  console.log("Click on Table 2");
  console.log(`Event phase ${event.eventPhase}`);
  console.log(`Event target text: ${event.target.innerText}`);

  let cell = event.target;
  let row = cell.closest("tr"); //Найти ближайший родительский элемент <tr> для элемента cell

  console.log(`Click on cell: ${cell.cellIndex + 1}`);
  if (currCell) currCell.classList.remove("bg-secondary", "text-white");
  currCell = cell;
  currCell.classList.add("bg-secondary", "text-white");

  console.log(`Click on row: ${row.sectionRowIndex + 1}`);
  if (currCell) currCell.classList.remove("border-secondary");
  curRow = row;
  curRow.classList.add("border-secondary");
} // this — это ссылка на объект, внутри которого сейчас выполняется код
