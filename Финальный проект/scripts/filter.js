import { filterUsers } from "./users.js";
import { fillTable } from "./table.js";
import { debounce } from "./lib.js";

const filterForm = document.forms["filter-form"];
const filterInput = filterForm.filter;

export const applyFilter = () => {
  filterInput.addEventListener(
    "input",
    debounce(() => filterUsersHandler(filterInput.value)),
  );

  function filterUsersHandler(filter) {
    const result = filterUsers(filter);
    fillTable(result);
  }
};
