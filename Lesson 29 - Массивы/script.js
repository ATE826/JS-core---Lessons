"use strict";

// const buttons = document.querySelectorAll("button");
// console.log(buttons);

// const array = [2, 5, 8];
// console.log(typeof array);

// for (let i = 0; i < array.length; i++) {
//   console.log(array[i], array.at(i));
// }

// for (let i of array) {
//   console.log(i);
// }

// array.forEach((currVal, idx) => {
//   // idx, array необязательны
//   console.log(`${idx} : ${currVal}`);
// });

// array.push(10);
// array.shift();
// array.pop();
// array.splice(1, 1, 15); // начиная с индекса 1, удалить 1 элемент и вставить вместо него число 15
// array.push(25);
// array.push(20);
// console.log(array);

// array.reverse();
// console.log(array);

// array.sort((a, b) => a - b); // По умолчанию сортируются как строки
// console.log(array);

// console.log(array.concat(67, 87, 98));
// console.log(array.map((item) => item * 2));
// console.log(array.filter((item) => item % 2 == 1));
// console.log(array.find((item) => item % 2 == 1));
// console.log(array.findLast((item) => item % 2 == 1));
// console.log(array.findIndex((item) => item % 2 == 1));
// console.log(array.findLastIndex((item) => item % 2 == 1));
// console.log(array.every((item) => item >= 10));
// console.log(array.some((item) => item >= 10));
// console.log(
//   array,
//   "sum:",
//   array.reduce((prev, curr) => prev + curr),
// );

// Array.isArray(array);
// console.log(array.join("-"), typeof array.join("/"));

const cardContainer = document.querySelector(".card-container");

const showUsersBtn = document.getElementById("show-users");
const showVipUsersBtn = document.getElementById("show-vip-users");
const sortByNameBtn = document.getElementById("sort-by-name");
const sortByAgeBtn = document.getElementById("sort-by-age");
const filterField = document.getElementById("filter-field");

const users = [
  {
    id: 1,
    name: "Toni Tsey",
    status: "user",
    age: 25,
    backColor: "orange",
  },
  {
    id: 2,
    name: "Mary Young",
    status: "vip user",
    age: 21,
    backColor: "gray",
  },
  {
    id: 3,
    name: "John Snow",
    status: "user",
    age: 34,
    backColor: "seagreen",
  },
  {
    id: 4,
    name: "Ben Dru",
    status: "user",
    age: 43,
    backColor: "purple",
  },
  {
    id: 5,
    name: "Den West",
    status: "vip user",
    age: 23,
    backColor: "greenyellow",
  },
  {
    id: 6,
    name: "Lena Rainer",
    status: "user",
    age: 31,
    backColor: "chocolate",
  },
  {
    id: 7,
    name: "Linda Grey",
    status: "vip user",
    age: 26,
    backColor: "lightsalmon",
  },
  {
    id: 7,
    name: "Kanye Fusse",
    status: "user",
    age: 36,
    backColor: "teal",
  },
];

showUsersBtn.onclick = function () {
  // sort() сравнивает элементы попарно; функция сравнения возвращает отрицательное число,
  // 0 или положительное, определяя порядок элементов в массиве.
  showUsers(users.sort((item1, item2) => item1.id - item2.id));
};

showVipUsersBtn.onclick = function () {
  showUsers(users.filter((user) => user.status == "vip user"));
};
sortByNameBtn.onclick = function () {
  showUsers(users.sort((item1, item2) => item1.name.localeCompare(item2.name)));
  // localeCompare() сравнивает строки
};
sortByAgeBtn.onclick = function () {
  showUsers(users.sort((item1, item2) => item1.age - item2.age));
};

filterField.oninput = function () {
  const filteredUsers = users.filter((item) =>
    item.name.toLocaleLowerCase().includes(this.value.toLocaleLowerCase()),
  );
  showUsers(filteredUsers);
};

function showUsers(users) {
  cardContainer.innerHTML = "";
  users.forEach((item) => {
    cardContainer.append(createUserCard(item));
  });
}

// Создаём карточку
function createUserCard(user) {
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "col-3 p-2";

  const card = document.createElement("div");
  card.className = "card p-4 d-flex flex-row";

  const cardImage = document.createElement("div");
  cardImage.className = "card-image rounded-circle me-4";
  cardImage.style.backgroundColor = user.backColor;

  const cardText = document.createElement("div");
  cardText.className = "flex-grow-1";

  const userName = document.createElement("h4");
  userName.className = "mb-2";
  userName.innerText = user.name;

  const userStatus = document.createElement("p");
  userStatus.className = "pb-2 border-bottom";
  userStatus.innerText = `Status: ${user.status}`;

  const userAge = document.createElement("p");
  userAge.className = "text-secondary";
  userAge.innerText = `Age: ${user.age}`;

  cardText.append(userName);
  cardText.append(userStatus);
  cardText.append(userAge);

  card.append(cardImage);
  card.append(cardText);

  cardWrapper.append(card);

  return cardWrapper;
}
