"use strict";

const userform = document.forms["userForm"];

userform.elements.username.value = "Peter";
userform.elements.email.value = "email@email.email";

userform.submit();
