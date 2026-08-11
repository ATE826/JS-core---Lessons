"use strict";

// HTML Drag & Drop API

const taskList1 = document.querySelector(".task-list-1");
const taskList1Items = document.querySelectorAll(".list-group-item");
const taskList2 = document.querySelector(".task-list-2");

for (let task of taskList1Items) {
  task.draggable = true;
}

// Начало перетаскивания из списка 1
taskList1.addEventListener("dragstart", (event) => {
  event.target.classList.add("shadow-sm");
  event.dataTransfer.setData("text", "custom data");
});

// Начало перетаскивания из списка 2
taskList2.addEventListener("dragstart", (event) => {
  event.target.classList.add("shadow-sm");
});

// Попадание эл-та в цель перетаскивания
taskList2.addEventListener("dragover", (event) => {
  const backEl = document.elementFromPoint(event.clientX, event.clientY);
  if (backEl.tagname != "LI") event.preventDefault();
});

// Сброс эл-та в цель перетаскивания
taskList2.addEventListener("drop", (event) => {
  console.log(event.dataTransfer.getData("text"));
  const currentEl = document.querySelector(".shadow-sm");
  const prevEl = document.elementFromPoint(
    event.clientX,
    event.clientY - currentEl.offsetHeight / 2,
  );
  prevEl.tagName == "LI"
    ? taskList2.insertBefore(currentEl, prevEl.nextElementSibling)
    : taskList2.append(currentEl);
});

// Конец перетаскивания
taskList2.addEventListener("dragend", (event) => {
  event.target.classList.remove;
});

// PointerEvents API
const jsTaskList1 = document.querySelector(".js-task-list-1");
const jsTaskList1Items = jsTaskList1.querySelectorAll(".list-group-item");
const jsTaskList2 = document.querySelector(".js-task-list-2");

// Добавление drag & drop
for (let item of jsTaskList1Items) {
  // Отключение обработки события перетаскиваниия dragstart
  item.ondragstart = function () {
    return false;
  };

  // Добавление pointerdown
  item.addEventListener("pointerdown", onPointerDown);
}

function onPointerDown(event) {
  document.addEventListener("pointerup", dropElement);
  document.addEventListener("pointermove", onPointerMove);

  const dragEl = this;

  let shiftX = event.clientX - dragEl.getBoundingClientRect().left;
  let shiftY = event.clientY - dragEl.getBoundingClientRect().top;

  dragEl.style.width = `${event.target.offsetHeight}px`;
  dragEl.style.position = "absolute";
  dragEl.style.zIndex = 1000;

  let backEl;
  let prevEl;

  function onPointerMove(event) {
    dragEl.hidden = true;
    backEl = document.elementFromPoint(event.clientX, event.clientY);
    prevEl = document.elementFromPoint(
      event.clientX,
      event.clientY - dragEl.offsetHeight / 2,
    );
    dragEl.hidden = false;
    moveAt(event.pageX, event.pageY);
  }

  function moveAt(pageX, pageY) {
    dragEl.style.left = pageX - shiftX + "px";
    dragEl.style.top = pageY - shiftY + "px";
  }

  function dropElement(event) {
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", dropElement);
    if (backEl.classList.contains("js-task-list-2")) {
      jsTaskList2.append(dragEl);
    } else if (
      prevEl.tagName == "LI" &&
      backEl.parentElement.classList.contains("js-task-list-2")
    ) {
      jsTaskList2.insertBefore(dragEl, prevEl);
    }
    dragEl.style = "";
  }
}

// PointerCapture
const mark = document.getElementById("mark");
const slider = document.getElementById("slider");

mark.onpointerdown = function (event) {
  mark.setPointerCapture(event.pointerId);

  mark.onpointermove = function (event) {
    let newLeft = event.clientX - slider.getBoundingClientRect().left;

    if (newLeft < 0) newLeft = 0;

    let maxLeft =
      slider.getBoundingClientRect().width - mark.getBoundingClientRect().width;

    if (newLeft > maxLeft) newLeft = maxLeft;

    mark.style.left = newLeft + "px";
  };

  mark.onpointerup = function () {
    mark.onpointermove = null;
    mark.onpointerup = null;
  };
};
