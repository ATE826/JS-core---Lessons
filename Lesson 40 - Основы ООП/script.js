"use strict";

const row1List = document.querySelectorAll("#row-1 ul");
const row2List = document.querySelectorAll("#row-2 ul");

function addItems(listEl, obj, objName) {
  listEl.append(addItem("object", objName, true));

  for (let key in obj) {
    listEl.append(addItem(key, obj[key]));
  }
}

function addItem(key, value, title = false) {
  const li = createEl("li");
  li.className = "list-group-item";
  li.innerText = `${key}: ${value}`;
  if (title) li.classList.add("active");
  return li;
}

function createEl(element = "div") {
  return document.createElement(element);
}

// ПРОТОТИПНЫЙ ПОДХОД
// Устнановка св-вом __proto__

const pc = {
  procesor: "Intel",
  "processor model": "Core i7",
  ram: "16GB",
  ssd: "1TB",
  "video card": "RTX 4060",
};

const pc1 = {
  ram: "32GB",
  __proto__: pc,
};

addItems(row1List[0], pc1, "PC 1");

// Установка прототипа конструктору (св-во prototype)
function newPc(processor, processorModel) {
  this.processor = processor;
  this["processor model"] = processorModel;
}
newPc.prototype = pc; // сделать объект pc прототипом для всех объектов, созданных через конструктор Pc

const pc2 = new newPc("AMD", "Ryzen 3");
addItems(row1List[1], pc2, "PC 2");

// Использование методов объекта object
const pc3 = Object.create(pc, {
  "processor model": {
    value: "Core i5",
    enumerable: true,
  },
});

addItems(row1List[2], pc3, "PC 3");

// КЛАСС-ОРИЕНТИРОВАННЫЙ ПОДХОД
// Родительский (базовый) класс

class PC {
  "video card" = "RTX 5040";

  constructor(processor, processorModel, ram, ssd) {
    this.processor = processor;
    this.processorModel = processorModel;
    this.ram = ram;
    this.ssd = ssd;
  }

  getInfo() {
    return `
      processor: ${this.processor}
      processor model: ${this.processorModel}
      ram: ${this.ram}
      ssd: ${this.ssd}
      video card: ${this["video card"]}
    `;
  }
}

const pc4 = new PC("AMD", "Ryzen 5", "32GB", "2TB");
addItems(row2List[0], pc4, "PC 4");

// Наследование класса
class Desctop extends PC {
  constructor(processor, processorModel, ram, ssd, videoCard) {
    super(processor, processorModel, ram, ssd); // super() вызывает конструктор родительского класса PC
    // и передаёт ему необходимые параметры для инициализации унаследованных свойств
    this["video card"] = videoCard;
  }
}

const pc5 = new Desctop("Apple", "M5 Max", "128GB", "8TB", "Apple GPU");
addItems(row2List[1], pc5, "PC 5");
console.log("pc5 instanseof PC (пренадлежит ли классу):", pc5 instanceof PC);

// Св-ва и методы класса
class Animal {
  static animalTypes = [];
  #clinic = "PetsFriends";

  constructor(type, name, age) {
    this.type = type;
    this.name = name;
    this.age = age;

    Animal.addAnimal(type);
  }

  set type(type) {
    this["animal type"] = type;
  }

  get type() {
    return this["animal type"];
  }

  getClinic() {
    return this.#clinic;
  }

  static addAnimal(type) {
    if (!this.animalTypes.includes(type)) this.animalTypes.push(type);
  }
}

const pet1 = new Animal("dog", "Nori", 10);
addItems(row2List[2], pet1, "PET 1");

const pet2 = new Animal("cat", "Tom", 5);
const pet3 = new Animal("mouse", "Jerry", 4);
console.log("animal types", Animal.animalTypes);

console.log("pet1 type", pet1.type);
console.log("pet1 clinic", pet1.getClinic());
