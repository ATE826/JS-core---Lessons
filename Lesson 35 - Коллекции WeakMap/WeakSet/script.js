"use strict";

const workerSelect = document.getElementById("worker-select");
const fireWorkerSelect = document.getElementById("fire-worker-btn");
const getAvSalaryBtnt = document.getElementById("get-salary-btn");
const showCacheBtn = document.getElementById("show-cache-btn");

const workerSalaryInfo = document.getElementById("worker-salary-info");
const cacheStatusInfo = document.getElementById("cache-status");

const workers = [
  {
    id: 1,
    name: "John Doe",
    salary: [1200, 1100, 2000, 1400],
  },
  {
    id: 2,
    name: "Jane Smith",
    salary: [1500, 1600, 1700, 1800],
  },
  {
    id: 3,
    name: "Michael Brown",
    salary: [1000, 1200, 1300, 1400],
  },
  {
    id: 4,
    name: "Emily Johnson",
    salary: [2000, 2100, 1900, 2200],
  },
  {
    id: 5,
    name: "David Wilson",
    salary: [1300, 1400, 1500, 1600],
  },
  {
    id: 6,
    name: "Sarah Davis",
    salary: [1800, 1700, 1900, 2000],
  },
  {
    id: 7,
    name: "Robert Miller",
    salary: [1100, 1250, 1350, 1450],
  },
  {
    id: 8,
    name: "Lisa Anderson",
    salary: [1600, 1750, 1850, 1950],
  },
  {
    id: 9,
    name: "James Taylor",
    salary: [1400, 1500, 1600, 1700],
  },
  {
    id: 10,
    name: "Anna Thomas",
    salary: [1900, 2000, 2100, 2200],
  },
];

fillWorkerSelect(workerSelect, workers);

function fillWorkerSelect(select, workers) {
  workers.forEach((worker) => {
    const option = new Option(worker.name, worker.id); // new Option(текст, value)
    select.append(option);
  });
}

// Инфо о средней зп
// Реализуем кэщ
// WeakMap
const averageSalaries = new WeakMap();

getAvSalaryBtnt.onclick = function () {
  const worker = getWorker();
  if (worker) {
    workerSalaryInfo.innerText = `Average salary: ${calcAvSalary(worker)}$`;
  } else {
    workerSalaryInfo.innerText = "This worker was fired";
  }
};

function calcAvSalary(worker) {
  if (!averageSalaries.has(worker)) {
    const salaries = worker.salary;

    const avgSalary =
      salaries.reduce((acc, num) => {
        return acc + num;
      }, 0) / salaries.length;
    averageSalaries.set(worker, avgSalary);
    cacheStatusInfo.innerText = "cached";
  } else {
    cacheStatusInfo.innerText = "Average salary is already cached (from cache)";
  }

  return averageSalaries.get(worker);
}

function getWorker() {
  const workerId = +workerSelect.value;
  const worker = workers.find((item) => item.id == workerId);

  return worker ?? null;
}

// Отображение статуса при изменении в списке
workerSelect.onchange = function () {
  if (getWorker()) {
    workerSalaryInfo.innerText = "Info about worker salary";
  } else {
    workerSalaryInfo.innerText = "This worker was fired";
  }

  cacheStatusInfo.innerText = "";
};

showCacheBtn.onclick = function () {
  console.log(averageSalaries);
};

fireWorkerSelect.onclick = function () {
  const worker = getWorker();

  if (worker) {
    const workerIdx = workers.findIndex((item) => item.id == worker.id);
    workers.splice(workerIdx, 1);
    workerSalaryInfo.innerText = `Worker ${worker.name} was fired!`;
    cacheStatusInfo.innerText = "";
  }
};

// WeakSet
const users = [
  { name: "Toni", age: 21 },
  { name: "Anna", age: 25 },
  { name: "Michael", age: 30 },
  { name: "John", age: 28 },
  { name: "Emily", age: 22 },
  { name: "David", age: 35 },
  { name: "Sarah", age: 27 },
  { name: "Alex", age: 24 },
  { name: "Lisa", age: 31 },
  { name: "Robert", age: 29 },
];

const activeUsers = new WeakSet();

users.forEach((user) => {
  activeUsers.add(user);
});

// Добавляем второй раз
users.forEach((user) => {
  activeUsers.add(user);
});

console.log(activeUsers);
