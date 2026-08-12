"use strict";

const table = document.querySelector(".table");
const thead = table.tHead;
const tBody = table.tBodies[0];

const users = [
  {
    id: 2456,
    name: "Alex Dow",
    age: 24,
    address: {
      zip: 2413,
      city: "chicago",
      street: "River road, 77",
    },
  },
  {
    id: 3812,
    name: "Emily Carter",
    age: 29,
    address: {
      zip: 5021,
      city: "new york",
      street: "Main street, 15",
    },
  },
  {
    id: 4973,
    name: "Michael Brown",
    age: 35,
    address: {
      zip: 7310,
      city: "los angeles",
      street: "Sunset boulevard, 42",
    },
  },
  {
    id: 5629,
    name: "Sophia Wilson",
    age: 21,
    address: {
      zip: 1845,
      city: "dallas",
      street: "Lake avenue, 8",
    },
  },
  {
    id: 6741,
    name: "Daniel Miller",
    age: 27,
    address: {
      zip: 3942,
      city: "boston",
      street: "Washington street, 31",
    },
  },
  {
    id: 8257,
    name: "Olivia Davis",
    age: 32,
    address: {
      zip: 6174,
      city: "seattle",
      street: "Pine street, 56",
    },
  },
];

// users.forEach((item, idx) => (item.id = idx + 1));

// users.forEach((item, idx) => (item.id1 = idx + 1));
// Добавление символьных св-в к объектам
const id = Symbol("id");
users.forEach((item, idx) => (item[id] = idx + 1));

users.forEach((user) => {
  if (user.address) {
    user.address[Symbol.toPrimitive] = function (hint) {
      return hint == "string" ? `${this.city}, ${this.street}` : this.zip;
    };
  }
});

showUsers(users);

function showUsers(users) {
  thead.append(addHead(Object.keys(users[0])));

  users.forEach((user) => tBody.append(addRow(user)));
}

function addHead(keys) {
  const tr = document.createElement("tr");
  keys.forEach((key) => {
    const th = document.createElement("th");
    th.innerText = key[0].toUpperCase() + key.slice(1);
    tr.append(th);
  });
  return tr;
}

function addRow(user) {
  const tr = document.createElement("tr");
  for (let key in user) {
    const td = document.createElement("td");
    td.innerText = user[key];
    // if (key == "id") td.innerText = tBody.rows.length + 1;
    // Исходный id подменяем нашим (занесённым в скрытое св-во
    // символьным ключём (скрыт для остального кода)
    // (старый id остался для стороннего кода))
    if (key == "id") td.innerText = user[id];
    tr.append(td);
  }
  return tr;
}

console.log("General object properties", Object.getOwnPropertyNames(users[0]));
console.log("Symbol object properties", Object.getOwnPropertySymbols(users[0]));
console.log("All object properties", Reflect.ownKeys(users[0]));

// Объект в примитив системным символом
const user = {
  name: "Ron Cray",
  age: 34,
  [Symbol.toPrimitive]: function (hint) {
    console.log(`hint ${hint}`);
    return hint == "string" ? this.name : this.age;
  },
};

console.log(user);
console.log(+user);
console.log(user + 2);

const newUser = {
  name: "John Cray",
  age: 36,

  toString() {
    return this.name;
  },

  valueOf() {
    return this.age;
  },
};

console.log("newUser", newUser.toString());
console.log("+newUser", +newUser);
console.log("newUser + 2", newUser + 2);
