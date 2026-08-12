"use strict";

const table = document.querySelector(".table");
const tableBody = table.tBodies[0];
const alertWrapper = document.querySelector(".col-4");
const alert = alertWrapper.querySelector(".alert");

const users = [
  {
    name: "John Marston",
    age: 35,
    address: {
      zip: 123432,
      city: "New York",
      street: "5th Avenue, 65/34",
    },
  },
];
// Копируется ссылка на объект, а не объект
// assign({}, users[0]); {} - новый пустой объект, в котором будет создан клон, users[0] - ссылка на клонируемый объект

//  Object.assign не клонирует вложенные объекты!!!
// Поверхностное клонирование
// const user2 = Object.assign({}, users[0]);

// Глубокое клонирование (включая вложенные)
//const user2 = structuredClone(users[0]);

// JSON.parse() — это метод JavaScript, который превращает
// JSON-строку в обычный JavaScript-объект или массив

// JSON.stringify превращает JavaScript-объект или массив в JSON-строку
const user2 = JSON.parse(JSON.stringify(users[0]));
user2.name = "Arthur Morgan";
user2.address.street = "Stone street, 57";
users.push(user2);

showUsers(users);

// Клонирование DOM объектов
const alert2 = alert.cloneNode(true);
alert2.innerText = "Element 2";

alertWrapper.append(alert2);

function showUsers(users) {
  tableBody.innerHTML = "";

  users.forEach((user) => {
    createRow(user);
  });
}

// -------------
// Функция-конструктор объекта
function User(name, age, address) {
  this.name = name;
  this.age = age;
  this.address = address;
}

function Address(zip, city, street) {
  this.zip = zip;
  this.city = city;
  this.street = street;
}

users.push(
  new User("Mary Brown", 25, new Address(23464, "Las-Vegas", "brick str, 56")),
);
users.push(
  new User("Joe Doe", 29, new Address(52354, "San-Antonio", "grass str, 34")),
);
users.push(
  new User(
    "Linda Freeman",
    23,
    new Address(436764, "California", "river str, 67"),
  ),
);

showUsers(users);

// -------------

function createRow(user) {
  const rowElement = document.createElement("tr");
  for (let i = 0; i < 6; i++) {
    const tdElement = document.createElement("td");

    let tdText;

    switch (i) {
      case 0:
        tdText = tableBody.rows.length + 1;
        break;
      case 1:
        tdText = user.name.split(" ")[0];
        break;
      case 2:
        tdText = user.name.split(" ")[1];
        break;
      case 3:
        tdText = user.age;
        break;
      case 4:
        tdText = user.address.city;
        break;
      case 5:
        tdText = user.address.street;
        break;
    }
    tdElement.innerText = tdText;
    rowElement.append(tdElement);
  }

  tableBody.append(rowElement);
}

console.log("user2 enries:", Object.entries(user2));
console.log("user2 keys:", Object.keys(user2));
console.log("user2 values:", Object.values(user2));
