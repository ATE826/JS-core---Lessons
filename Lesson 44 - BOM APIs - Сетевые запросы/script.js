"use strict";

// Сайты тестовых серверов
// jsonplaceholder.typicode.com
// dummyjson.com

const table1 = document.getElementById("table1");
const table2 = document.getElementById("table2");

const form = document.forms["comment-form"];

const alert = document.querySelector(".alert pre");

// Fetch()
// Получение данных
// Примеп 1: Обработка рез-та промиса методом then
const users = fetch("https://dummyjson.com/users?limit=9")
  .then((response) => response.json())
  .then((json) => json.users.forEach((user) => fillRow(user, table1)));

function fillRow(user, table) {
  const tr = document.createElement("tr");
  for (let i = 0; i < 4; i++) {
    tr.append(createCell(user, i));
  }
  table.tBodies[0].append(tr);
}

function createCell(user, i) {
  const td = document.createElement("td");
  let content;
  switch (i) {
    case 0:
      content = user.id;
      break;
    case 1:
      content = `${user.firstName} ${user.lastName}`;
      break;
    case 2:
      content = user.email;
      break;
    case 3:
      content = user.address.city;
      break;
  }
  td.innerText = content;
  return td;
}
// Примеп 2: Обработка рез-та промиса await
async function getPost(id) {
  // Получение заголовков ответа
  const response = await fetch(`https://dummyjson.com/posts/${id}`);
  console.log(response);

  // Получение тела ответа в формате JSON
  return await response.json();
}

const post1 = getPost(5).then((res) => console.log(res));

// Отправка данных
const postUrl = "https://dummyjson.com/comments/add";

form.onsubmit = async function (event) {
  event.preventDefault();
  alert.innerText = "";

  // Записываем поля формы в формате JSON
  const formData = formPostData(this);
  this.reset();

  // Если не установлен checkbox
  if (!this.xhr.checked) {
    const result = await fetchSend(postUrl, formData);
    alert.innerText = JSON.stringify(result, null, 2);
  } else {
    xhrSend(postUrl, formData);
  }
};

function formPostData(form) {
  // const formData = JSON.stringify({
  //   body: form.body.value,
  //   userId: 4,
  //   postId: form.postId.value,
  // });

  const formData = new FormData(form);
  formData.append("userId", 4);
  formData.delete("xhr");

  for (let [name, value] of formData) {
    console.log(`${name} = ${value}`);
  }
  return formData;
}

// Отправка методом fetch()
async function fetchSend(url, data) {
  const res = await fetch(url, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: data,
  });

  return await res.json();
}

// XMLHttpRequest
const xhr = new XMLHttpRequest();

// Инициализация и настройка GET запроса по URL
xhr.open("GET", "https://dummyjson.com/users?limit=9");
xhr.responseType = "json";

// Отправка запроса
xhr.send();

// Обработка ответов сервера
xhr.onload = function () {
  if (xhr.status != 200) {
    console.log(`Error: ${xhr.status}: ${xhr.statusText}`);
  } else {
    // response — тело ответа сервера, автоматически преобразованное
    // в зависимости от xhr.responseType (например, при "json" — это уже готовый объект/массив, а не строка)
    xhr.response.users.forEach((user) => fillRow(user, table2));
  }
};

// Событие прогресса загрузки/получения данных через XMLHttpRequest
xhr.onprogress = function (event) {
  // event.lengthComputable — известен ли общий размер данных (есть ли Content-Length)
  // event.loaded — сколько байт уже получено на текущий момент
  // event.total  — общий размер данных в байтах (0, если lengthComputable === false)
  if (event.lengthComputable) {
    console.log(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    console.log(`Received ${event.total} bytes`);
  }
};

xhr.onerror = function () {
  console.log("Error");
};

// Отправка методами XMLHttpRequest
function xhrSend(url, data) {
  const xhr = new XMLHttpRequest(); // создаём новый объект запроса

  xhr.responseType = "json"; // указываем, что ответ сервера нужно сразу распарсить как JSON

  xhr.open("POST", url); // инициализируем запрос: метод POST, указанный url (соединение ещё не открывается)

  xhr.send(data); // отправляем запрос на сервер с телом data (FormData, строка, Blob и т.д.)

  xhr.onload = () => (alert.innerText = JSON.stringify(xhr.response, null, 2));
  // обработчик успешного завершения запроса:
  // когда ответ от сервера полностью получен, берём готовый объект xhr.response
  // и выводим его в виде отформатированной JSON-строки в элемент alert
}
