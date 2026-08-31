import { fillTable, deleteRowSelection } from "./table.js";
import { addUser, updateUser } from "./users.js";
const form = document.forms["user-form"];

const applyUserForm = () => {
  // Валидация формы по умолчанию
  form.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      // event.stopPropagation() останавливает распространение (всплытие) события по дереву DOM
      // то есть событие не будет дальше передаваться родительским элементам.
      event.stopPropagation();

      form.classList.add("was-validated");
    } else {
      form.classList.remove("was-validated");
      formHandler(event);
    }
  });
  // Обработка данных
  function formHandler(event) {
    event.preventDefault();
    // Обновление данных пользователя
    if (form.hasAttribute("data-id")) {
      updateUser({
        id: form.getAttribute("data-id"),
        name: form.name.value,
        email: form.email.value,
        code: form.code.value,
      });
      deleteRowSelection(form.getAttribute("data-id"));
      form.removeAttribute("data-id");
    }
    // Добавление нового пользователя
    else {
      addUser({
        name: form.name.value,
        email: form.email.value,
        code: form.code.value,
      });
    }

    form.reset();
    fillTable();
  }
};

function editForm(user) {
  form.name.value = user.name;
  form.email.value = user.email;
  form.code.value = user.code;

  form.setAttribute("data-id", user.id);
}

export { applyUserForm, editForm };
