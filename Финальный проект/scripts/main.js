import { getUsersFromSite } from "./users.js";
import { fillTable } from "./table.js";
import { applyUserForm } from "./form.js";
import { applyFilter } from "./filter.js";
import { applyTest } from "./tests.js";
init();

async function init() {
  await getUsersFromSite();
  fillTable();
  applyUserForm();
  applyFilter();
  applyTest();
}
