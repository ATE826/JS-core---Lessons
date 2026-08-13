"use strict";

const products = [
  {
    id: 1,
    title: "meat",
    price: 45,
    icon: "drumstick-bite",
    category: "meat",
  },
  {
    id: 2,
    title: "chicken",
    price: 30,
    icon: "drumstick-bite",
    category: "meat",
  },
  {
    id: 3,
    title: "fish",
    price: 50,
    icon: "fish",
    category: "fish",
  },
  {
    id: 4,
    title: "apple",
    price: 15,
    icon: "apple-whole",
    category: "fruit",
  },
  {
    id: 5,
    title: "milk",
    price: 25,
    icon: "glass-water",
    category: "dairy",
  },
  {
    id: 6,
    title: "cheese",
    price: 40,
    icon: "cheese",
    category: "dairy",
  },
  {
    id: 7,
    title: "bread",
    price: 18,
    icon: "bread-slice",
    category: "bakery",
  },
  {
    id: 8,
    title: "carrot",
    price: 12,
    icon: "carrot",
    category: "vegetables",
  },
  {
    id: 9,
    title: "eggs",
    price: 22,
    icon: "egg",
    category: "meat",
  },
];

const productsWrapper = document.querySelector(".products");
addproducts(products);

function addproducts(products) {
  productsWrapper.innerHTML = "";
  products.forEach((item) => productsWrapper.append(createProduct(item)));
  addDragable();
}

function createProduct(product) {
  const wrapperElement = document.createElement("div");
  wrapperElement.className = "p-2 product";
  wrapperElement.setAttribute("title", product.title);
  const productElement = document.createElement("i");
  productElement.className = `fa-solid fa-${product.icon} product-icon`;
  wrapperElement.append(productElement);

  return wrapperElement;
}

function addDragable() {
  const productItems = document.querySelectorAll(".product");

  for (let item of productItems) {
    item.draggable = true;
  }
}

//Корзина продуктов - коллекция Map
const cart = new Map();

// Заполнение корзины эл-тами (drag & drop)
const cartElement = document.querySelector(".cart");

productsWrapper.addEventListener("dragstart", (event) => {
  const productTitle = event.target.getAttribute("title");
  event.dataTransfer.setData("title", productTitle);
});

cartElement.addEventListener("dragover", (event) => {
  event.preventDefault();
  cartElement.style.color = "#40a578";
  cartElement.style.borderColor = "#40a578";
});

cartElement.addEventListener("dragleave", (event) => {
  cartElement.style.color = "";
  cartElement.style.borderColor = "";
});

cartElement.addEventListener("drop", (event) => {
  const productName = event.dataTransfer.getData("title");
  const product = products.find((item) => item.title == productName);
  if (cart.has(product)) {
    cart.set(product, cart.get(product) + 1);
  } else {
    cart.set(product, 1);
  }

  showCart();
  cartElement.style.color = "";
  cartElement.style.borderColor = "";
});

const cartContent = document.querySelector(".cart-content");

function showCart() {
  // console.log(cart);
  cartContent.innerHTML = "";
  cart.forEach((value, key) => {
    cartContent.insertAdjacentHTML(
      "beforeend",
      `
      <li class="list-group-item d-flex justify-content-between align-items-start>
        <div class="ms-2 me-auto">
          <div class="fw-bold">${key.title}</div>
          Price: ${key.price}$
        </div>
        <div>
          <span class="badge rounded-pill">${value}</span>
          <span class="badge badge-delete rounded-pill">
            <i class="fa-solid fa-xmark" data-id="${key.id}"></i>
          </span>
        </div>
      </li>
      `,
    );
  });
  cartContent.insertAdjacentHTML(
    "beforeend",
    `
      <li class="list-group-item d-flex justify-content-between align-items-start>
        <div class="ms-2 me-auto fw-bold">
          Total products:
        </div>
        <div>
          <span class="badge badge-total rounded-pill">${cart.size}</span>
        </div>
      </li>
      `,
  );
}

// Удаление
cartContent.onclick = function (event) {
  const product = products.find((item) => item.id == event.target.dataset.id); // data-id="${key.id}
  cart.delete(product);
  showCart();
};

// Коллекция Set
// Map хранит пары ключ → значение, а Set хранит только уникальные значения

const productCategories = products.map((item) => item.category);
console.log(productCategories);

const uniceCategories = new Set(productCategories);
console.log(uniceCategories);

const select = document.querySelector(".form-select");

addCategoryOption(); // Добавляем все категории "all"

uniceCategories.forEach((value) => addCategoryOption(value));

function addCategoryOption(category = "all") {
  const option = new Option(category, category); // Добавление опции Option(text, value);
  select.append(option);
}

// Фильтрация
select.addEventListener("change", filterProducts);

function filterProducts(event) {
  const option = event.target.value;
  const filteredProducts =
    option == "all"
      ? products
      : products.filter((item) => item.category == option);
  addproducts(filteredProducts);
}
