export function showUsers(users, tBody) {
  users.forEach((user) => {
    addRow(user, tBody);
  });
}

function addRow(user, tBody) {
  const tr = document.createElement("tr");

  for (let value of Object.values(user)) {
    // console.log(value);
    const td = document.createElement("td");
    td.innerText = value;
    tr.append(td);
  }
  tBody.append(tr);
}
