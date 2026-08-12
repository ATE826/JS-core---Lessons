"use strict";

const table1 = document.getElementById("table-1");
const table2 = document.getElementById("table-2");
const table3 = document.getElementById("table-3");

const users = [
  {
    id: 2345,
    firstName: "Toni",
    lastName: "Tsey",
    age: 21,
    address: "Mayami, Palmbeach street, 45",
  },
  {
    id: 3187,
    firstName: "Alex",
    lastName: "Morgan",
    age: 28,
    address: "Chicago, Lake street, 12",
  },
  {
    id: 4261,
    firstName: "Emily",
    lastName: "Carter",
    age: 25,
    address: "New York, Madison avenue, 73",
  },
  {
    id: 5392,
    firstName: "Michael",
    lastName: "Brown",
    age: 34,
    address: "Boston, Cambridge street, 19",
  },
  {
    id: 6478,
    firstName: "Sophia",
    lastName: "Wilson",
    age: 22,
    address: "Dallas, Main street, 88",
  },
  {
    id: 7513,
    firstName: "Daniel",
    lastName: "Miller",
    age: 31,
    address: "Seattle, Pine street, 34",
  },
  {
    id: 8642,
    firstName: "Olivia",
    lastName: "Davis",
    age: 27,
    address: "Los Angeles, Sunset boulevard, 56",
  },
  {
    id: 9724,
    firstName: "James",
    lastName: "Taylor",
    age: 39,
    address: "Denver, Mountain road, 21",
  },
  {
    id: 1085,
    firstName: "Emma",
    lastName: "Anderson",
    age: 24,
    address: "Austin, Congress avenue, 47",
  },
  {
    id: 2169,
    firstName: "William",
    lastName: "Thomas",
    age: 30,
    address: "Portland, River street, 63",
  },
];

// Скрытие св-ва age в объектах пользователей
users.forEach((user) => {
  Object.defineProperty(user, "age", {
    writable: false,
    enumerable: false,
  });
});

// Клонирование пользователя
const newUser = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(users[0]),
);

// Изменение св-в объекта
Object.defineProperties(newUser, {
  id: {
    value: 4920,
    writable: false,
  },
  firstName: {
    value: "Jane",
    writable: false,
  },

  address: {
    value: "Texas, Groove street, 95",
    writable: false,
  },
});

users.push(newUser);
showUsers(users, table1);

function showUsers(users, table) {
  createRow(Object.keys(users[0]), table, "head");
  users.forEach((user, idx) => {
    const values = Object.values(user);
    // Заменяет первый элемент массива на index + 1.
    values.splice(0, 1, idx + 1);
    createRow(values, table);
  });
}

function createRow(values, table, tablePart = "body") {
  const tr = document.createElement("tr");
  const cellType = tablePart == "head" ? "th" : "td";
  const parent = tablePart == "head" ? table.tHead : table.tBodies[0];

  values.forEach((values) => {
    const cell = document.createElement(cellType);
    cell.innerText = values;
    tr.append(cell);
  });
  parent.append(tr);
}

// Отображение дескрипторов
showDescriptors(users[0]);

function showDescriptors(obj) {
  // Object.getOwnPropertyDescriptors() — это метод, который
  // получает описания всех собственных свойств объекта.
  const props = Object.getOwnPropertyDescriptors(obj);
  const propNames = Object.keys(props);
  const descriptors = Object.values(props);

  const flagNames = Object.keys(descriptors[0]);

  flagNames.unshift("prop name");

  console.log(flagNames);

  createRow(flagNames, table2, "head");

  descriptors.forEach((descriptor, idx) => {
    const flagValues = Object.values(descriptor);
    flagValues.unshift(propNames[idx]);

    createRow(flagValues, table2);
  });
}

// Геттер
users.forEach((user) => {
  Object.defineProperties(user, {
    city: {
      get() {
        return this.address.split(",")[0];
      },
      enumerable: true,
    },
    street: {
      get() {
        return this.address.split(",")[1];
      },
      enumerable: true,
    },
    building: {
      get() {
        return this.address.split(",")[2];
      },
      enumerable: true,
    },
    address: {
      enumerable: false,
    },
  });
});

showUsers(users, table3);

// Приватные св-ва
const book = {
  _pages: 0, // Приватное св-во (обращаемся через Get(), Set())
  get pages() {
    return this._pages;
  },

  set pages(value) {
    if (typeof value != "number") {
      console.log("Pages must be a number!");
      return;
    }
    this._pages = value;
  },
};

console.log(book.pages);
book.pages = true;
book.pages = 120;
console.log(book.pages);
