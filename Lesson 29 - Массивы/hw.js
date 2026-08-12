"use strict";

const taskList = [];

const form = document.forms.tasks;
const input = form.elements.task;
const list = document.querySelector(".list-group");

const addBtn = document.querySelector(".btn-success");
const deleteBtn = document.querySelector(".btn-danger");
const sortBtn = document.querySelector(".btn-warning");

addBtn.onclick = function (item) {
  item.preventDefault();

  const task = input.value.trim();

  if (task == "") {
    alert("Нельзя добавить пустую задачу!");
    reset(input);
    return;
  }

  taskList.push(task);
  input.value = "";

  showTasks(taskList);
};

deleteBtn.onclick = function (item) {
  item.preventDefault();

  if (taskList.length == 0) {
    alert("Нет нечего удалять!");
    return;
  }
  taskList.pop();
  showTasks(taskList);
};

sortBtn.onclick = function (item) {
  item.preventDefault();

  if (taskList.length == 0) {
    alert("Здесь нечего сортировать!");
  }

  const sortedTasks = taskList.sort((item1, item2) =>
    item1.localeCompare(item2),
  );
  showTasks(sortedTasks);
};

function showTasks(tasks) {
  list.innerHTML = "";

  tasks.forEach((task) => {
    list.append(createTask(task));
  });
}

function createTask(task) {
  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.textContent = task;
  return li;
}

function reset(item) {
  item.value = "";
}
