import { usersArr, deleteUser, getUserById, sortUsers } from "./users.js";
import { editForm } from "./form.js";

const table = document.querySelector(".table");
const tBody = table.tBodies[0];
const tHead = table.tHead;

function fillTable(users = usersArr) {
  resetTable(tBody);
  users.forEach((user) => {
    createRow(user);
  });
}

function createRow(user) {
  const tr = document.createElement("tr");
  tr.append(createTd("th", user.id));
  tr.append(createTd("td", user.name));
  tr.append(createTd("td", user.email));
  tr.append(createTd("td", user.code));

  const actionsTd = createTd("td", "");
  const editBtn = createBtn("btn-dark", "Edit", user.id);
  const deleteBtn = createBtn("btn-danger", "Delete", user.id);

  editBtn.addEventListener("click", editUserHandler);
  deleteBtn.addEventListener("click", deleteUserHandler);

  actionsTd.append(editBtn, deleteBtn);

  tr.append(actionsTd);

  tBody.append(tr);
}

function createTd(type, content) {
  const td = document.createElement(type == "td" ? "td" : "th");
  td.innerText = content;
  return td;
}

function createBtn(className, content, attr) {
  const btn = document.createElement("button");
  btn.className = `btn btn-sm me-2 ${className}`;
  btn.innerText = content;
  btn.dataset.id = attr;

  return btn;
}

function resetTable(tBody) {
  tBody.innerHTML = "";
}

function editUserHandler(event) {
  const userId = event.target.dataset.id;
  const currentUser = getUserById(userId);
  editForm(currentUser);

  const editedElement = getCurrentRow(userId);
  editedElement.classList.add("edited");
}

function deleteUserHandler(event) {
  const userId = event.target.dataset.id;
  deleteUser(userId);
  const deletedEl = getCurrentRow(userId);
  deletedEl.classList.add("deleted");
  setTimeout(() => fillTable(), 400);
}

function getCurrentRow(id) {
  return tBody.querySelector(`[data-id="${id}"]`).closest("tr");
}

function deleteRowSelection(id) {
  const editedElement = getCurrentRow(id);
  editedElement.classList.remove("edited");
}

// Функция сортировки пользователей
tHead.addEventListener("click", sortUsersHandler);

function sortUsersHandler(event) {
  const sortParameter = event.target.dataset.sort;
  sortUsers(sortParameter);
  fillTable();
}

export { fillTable, deleteRowSelection };
