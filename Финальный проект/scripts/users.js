let usersArr;

// Получение пользователей

async function getUsersFromSite() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (response.ok) {
    // response.json(); тоже возвращает promise
    const users = await response.json();
    usersArr = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      //берёт последние 4 символа почтового индекса
      code: user.address.zipcode.slice(-4),
    }));
  } else {
    console.log("HTTP Error: " + response.status);
  }
}

function addUser(user) {
  const id = Math.max(...usersArr.map((user) => user.id));
  user.id = id + 1;
  usersArr.push(user);
}

function deleteUser(id) {
  const userIdx = usersArr.findIndex((user) => user.id == id);
  usersArr.splice(userIdx, 1);
}

function getUserById(id) {
  return usersArr.find((user) => user.id == id);
}

function updateUser(user) {
  const userIdx = usersArr.findIndex((item) => item.id == user.id);
  usersArr[userIdx].name = user.name;
  usersArr[userIdx].email = user.email;
  usersArr[userIdx].code = user.code;
}

function sortUsers(parameter) {
  if (parameter) {
    let sortFunc;
    if (typeof usersArr[0][parameter] == "string") {
      // Если сортировка по строкам
      sortFunc = (a, b) => a[parameter].localeCompare(b[parameter]);
    } else {
      sortFunc = (a, b) => a[parameter] - b[parameter];
    }
    usersArr.sort(sortFunc);
  }
}

function filterUsers(filter) {
  return usersArr.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase()),
  );
}

export {
  addUser,
  usersArr,
  getUsersFromSite,
  deleteUser,
  getUserById,
  updateUser,
  sortUsers,
  filterUsers,
};
