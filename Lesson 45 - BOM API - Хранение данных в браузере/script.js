"use strict";

const usersTable = document.getElementById("users-table");
const authForm = document.forms["auth-form"];
const authUserMessage = document.getElementById("auth-user-message");
const userHistoryMessage = document.getElementById("user-history-message");

// Аутентифицированные пользователи
const users = getUsersFromStorage();

// Отображение пользователей
getUsers().then((users) => fillTable(users, usersTable));

// Получение пользователей
async function getUsers() {
  // Объявляем асинхронную функцию — внутри можно использовать await

  const response = await fetch("https://dummyjson.com/users?limit=7");
  // Отправляем GET-запрос на сервер, получаем 5 пользователей
  // await приостанавливает выполнение функции, пока не придёт ответ (объект Response)

  const json = await response.json();
  // Извлекаем тело ответа и парсим его как JSON
  // await нужен, т.к. .json() тоже возвращает промис
  // Результат — обычный JS-объект (в нём ожидается свойство users — массив пользователей)

  const users = json.users.map((item) => ({
    id: item.id,
    username: item.username,
    password: item.password,
  }));
  // Проходим по массиву json.users методом map()
  // Для каждого пользователя (item) создаём новый объект,
  // оставляя только 3 поля: id, username, password
  // (остальные поля пользователя — email, имя, адрес и т.д. — отбрасываются)
  // Результат — новый массив "облегчённых" объектов пользователей

  console.log(users);

  return users;
}

// Занесение пользователей в таблицу
function fillTable(users, table) {
  users.forEach((user) => {
    table.tBodies[0].insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
      </tr>
      `,
    );
  });
}

// Отправка формы аутентификации
authForm.onsubmit = async function (event) {
  event.preventDefault();
  const data = new FormData(this);
  const response = await sendData(data);
  console.log(response);
  this.reset();

  if (response.status) {
    console.log(response.result);
    createCookie(response.result);
    addUsersToStorage(response.result);
  } else {
    console.warn(response.result.message);
  }
};

// Аутентификация
async function sendData(data) {
  try {
    // Ф-я браузера для отправки HTTP-запросов на сервер (получения или отправки данных)
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      body: data,
      // credentials: "include",
    });
    const status = response.ok;
    const result = await response.json();

    return { status, result };
  } catch (error) {
    console.warn(`Error: ${error.message}`);
  }
}

// Добавление Cookie
function createCookie(response) {
  setCookie("accessToken", response.accessToken);
  setCookie("refreshToken", response.refreshToken);
}

// Получение текущего аутентифициорванного пользователя
authForm["get-current-user"].onclick = async () => {
  authUserMessage.innerHTML = "";
  try {
    const response = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    const status = response.ok;
    const user = await response.json();
    if (status) {
      authUserMessage.insertAdjacentHTML(
        "beforeend",
        `
        <div><b>id:</b> ${user.id}</div>
        <div><b>first name:</b> ${user.firstName}</div>
        <div><b>last name:</b> ${user.lastName}</div>
        `,
      );
    }
  } catch (error) {
    console.warn(`Error: ${error.message}`);
  }
};

// Получение пользователей из localeStorage
function getUsersFromStorage() {
  // Преобразует JSON-строку в JS-объект (обратная операция от JSON.stringify)
  // ?? — оператор нулевого слияния (nullish coalescing operator).
  // Он возвращает правый операнд, только если левый равен null или undefined.
  // Во всех остальных случаях возвращается левый операнд.
  return JSON.parse(localStorage.getItem("users")) ?? [];
}

// Добавление пользователся в localStorage

function addUsersToStorage(user) {
  // деструктуризация объекта (destructuring assignment)
  // способ "распаковать" свойства объекта в отдельные переменные одной строкой.
  const { id, firstName, lastName } = user;
  users.push({
    id,
    firstName,
    lastName,
  });
  localStorage.setItem("users", JSON.stringify(users));
}

// Обновление истории
authForm["update-history"].onclick = () => {
  userHistoryMessage.innerHTML = "";
  const users = getUsersFromStorage();
  if (users.length) {
    for (let user of users) {
      userHistoryMessage.append(addUserToHistoryMessage(user));
    }
  }
};

function addUserToHistoryMessage(user) {
  const div = document.createElement("div");
  div.className = "badge rounded-pill text-bg-primary me-2";
  div.innerText = user.firstName + " " + user.lastName;

  return div;
}
