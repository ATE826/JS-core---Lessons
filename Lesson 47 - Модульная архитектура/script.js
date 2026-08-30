"use strict";

import { premiumUsers as users } from "./users.js";
import { showUsers } from "./showUsers.js";
import { getLastUser } from "./getLastUser.js";
import { addInfoItem } from "./addInfoItem.js";

import getAvgAge from "./getAvgAge.js";

const tBody = document.getElementById("tBody");
const infoMsg = document.getElementById("infoMsg");

showUsers(users, tBody);

// Добавление пользователя
users.push({
  id: 3000,
  name: "Charlotte Anderson",
  age: 26,
  address: "Georgia, Peachtree Street, 14",
});

const lastUser = getLastUser(users);
addInfoItem("Last user name", lastUser.name, infoMsg);

const avgAge = getAvgAge(users);
addInfoItem("Average users age", avgAge, infoMsg);

/**
 * ┌─────────────────────┬──────────────────────────┬───────────────────────────┐
 * │                      │   export (именованный)   │   export default          │
 * ├─────────────────────┼──────────────────────────┼───────────────────────────┤
 * │ Кол-во на файл       │   Можно много            │   Только один              │
 * ├─────────────────────┼──────────────────────────┼───────────────────────────┤
 * │ Синтаксис экспорта   │ export const x = 1;      │ export default x;          │
 * │                      │ export function f(){}    │ export default function(){}│
 * ├─────────────────────┼──────────────────────────┼───────────────────────────┤
 * │ Синтаксис импорта    │ import { x } from "./f"; │ import x from "./f";       │
 * │                      │ (имя ДОЛЖНО совпадать)   │ (имя можно любое)          │
 * ├─────────────────────┼──────────────────────────┼───────────────────────────┤
 * │ Импорт с др. именем  │ import { x as y }        │ не нужно — и так своё имя │
 * ├─────────────────────┼──────────────────────────┼───────────────────────────┤
 * │ Фигурные скобки {}   │   Обязательны            │   Не используются         │
 * ├─────────────────────┼──────────────────────────┼───────────────────────────┤
 * │ Импорт всего сразу   │ import * as all from...  │   —                        │
 * ├─────────────────────┼──────────────────────────┼───────────────────────────┤
 * │ Когда использовать   │ Утилиты, константы,      │ Главный/единственный       │
 * │                      │ несколько сущностей      │ экспорт файла (компонент,  │
 * │                      │                          │ класс, главная функция)    │
 * └─────────────────────┴──────────────────────────┴───────────────────────────┘
 *
 *
 *
 * Кратко: export — именованный, можно несколько на файл, импортируется
 * строго по тому же имени в {}. export default — один на файл (главный
 * экспорт), импортируется под любым именем, без фигурных скобок.
 */
