"use strict";

const form = document.forms.userForm;
const submitAlert = document.querySelector("#form-statu");
const userInfo = document.querySelector("#user-salary");

// Перехват ошибки
form.onsubmit = function (event) {
  event.preventDefault();

  const result = validateForm(this);
  try {
    if (result) {
      showSubmitAlert("success");
    } else {
      showSubmitAlert("danger");
      return false;
    }
    // Симуляция отправки формы
    console.log(">> Form has been submitted!");
    form.reset();
  } catch (error) {
    console.log("validation failed");
    showCaughtError(error);
  }
};

function validateForm(form) {
  let result = true;
  if (
    !validateField(form.name.value, "[a-zA-Z ]*$") ||
    !validateField(form.email.value, "^(.+)@(.+)$") ||
    !validateField(form.age.value, "^[\\d]{1,2}$")
  ) {
    result = false;
  }

  return result;
}

function validateField(field, mask) {
  return field.match(mask);
}

function showSubmitAlert(status) {
  submitAlert.classList.remove("alert-danger", "alert-success");
  submitAlert.classList.add(`alert-${status}`);
  submitAlert.innerText =
    status == "success"
      ? ">> Form has been submitted!"
      : ">> Form contains errors!";
}

function showCaughtError(error) {
  console.warn(`${error.name}: ${error.message}`);
}

// Генерация и проброс ошибки

const user1 = {
  name: "Toni Tsey",
  position: "Frontend developer",
  salaries: [50000, 110000, 200000, 300000, 500000, 800000, 1200000],
};

const user2 = {
  name: "Alex Morgan",
  position: "Backend developer",
  salaries: [60000, 120000, 220000, 350000, 550000, 850000, 1300000],
};

const user3 = {
  name: "Emily Johnson",
  position: "UI/UX designer",
};

const user4 = {
  name: "Daniel Smith",
  salaries: "fired",
};

function calcMedianSalary() {
  let result = true;
  try {
    // Генерация ошибки
    if (!this.salaries) {
      throw new SyntaxError(`for user ${this.name} salaries are absent`);
    }

    return (
      "₽" +
      Math.floor(
        this.salaries.reduce((a, b) => a + b, 0) / this.salaries.length,
      )
    );
  } catch (error) {
    result = false;
    if (error.name == "SyntaxError") {
      showCaughtError(error);
    } else {
      throw error;
    }
    return "unavailable";
  } finally {
    console.log(`logged: ${this.name}: ${result}`);
  }
}

function addUserInfo(user) {
  const div = createEl();
  div.className = "alert alert-light";
  div.innerText = `User ${user.name} median salary: ${calcMedianSalary.call(user)}`;
  userInfo.append(div);
}

function createEl(element = "div") {
  return document.createElement(element);
}

try {
  addUserInfo(user1);
  addUserInfo(user2);
  addUserInfo(user3);
  addUserInfo(user4);
} catch (error) {
  showCaughtError(error);
}

// Пользовательские ошибки
const testEl = document.querySelector("#test-element");
const myElement = document.querySelector("#my-element");

class ElementError extends TypeError {
  constructor(message) {
    super(message);
    this.name = "ElementError";
    this.message = "Element not found";
  }
}

function addText(element, content) {
  if (element == null) {
    throw new ElementError();
  }
  element.innerText = content;
}

try {
  addText(testEl, "Test example");
  addText(myElement, "My element example");
} catch (error) {
  if (error instanceof ElementError) {
    showCaughtError(error);
  } else {
    // Неизвестная ошибка, проброс исключения
    throw error;
  }
}
