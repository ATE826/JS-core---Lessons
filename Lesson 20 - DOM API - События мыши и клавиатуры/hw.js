const list = document.getElementById("list");

const listItem = document.getElementsByClassName("list-group-item");

let prevItem = null;

list.addEventListener("dblclick", chooseItemHandler);

function chooseItemHandler(event) {
  if (event.target.classList.contains("list-group-item")) {
    // Если уже есть выбранный
    if (prevItem !== null) {
      prevItem.classList.remove("bg-secondary-subtle");
      event.target.classList.add("bg-secondary-subtle");
      prevItem = event.target;
      console.log(prevItem);
    } else {
      event.target.classList.add("bg-secondary-subtle");
      prevItem = event.target;
    }
  }
}
