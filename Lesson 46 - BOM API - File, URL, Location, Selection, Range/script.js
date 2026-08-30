"use strict";

const productForm = document.forms["product-form"];
const imagePreview = document.getElementById("image-preview");
const imageInfo = document.getElementById("image-info");
const qpInfo = document.getElementById("qp-info");
const text = document.getElementById("text");
const toGoogleBtn = document.querySelector(".btn-primary");

// Отображение информации об изображении
productForm.image.onchange = function () {
  imageInfo.innerHTML = "";
  // Деструктуризация массива-подобной коллекции FileList:
  // берём первый выбранный файл из this.files (this — элемент <input type="file">)
  // .files — это свойство DOM-элемента <input type="file">, которое содержит список файлов,
  // выбранных пользователем через диалог выбора файла.
  const [file] = this.files;
  if (file) {
    isImage(file)
      ? getImageInfo(file)
      : (imageInfo.innerText = "File is no image");
  }
};

function isImage(file) {
  // match() ищет в строке текст, подходящий под регулярное выражение,
  // и возвращает найденное (в виде массива) или null, если ничего не нашлось
  return file.name.match(/\.(jpg|jpeg|png|gif)$/i);
}

function getImageInfo(file) {
  imagePreview.src = URL.createObjectURL(file);
  addInfoItem("Name: ", file.name, imageInfo);
  addInfoItem("Type: ", file.type, imageInfo);
  addInfoItem("Size: ", `${file.size / 1000} KB`, imageInfo);
  addInfoItem(
    "Last modified",
    // Преобразует timestamp (число мс) из file.lastModified в объект Date,
    // затем форматирует его в строку с датой в американском формате (MM/DD/YYYY)
    // file.lastModified — это свойство объекта File, которое хранит дату последнего
    // зменения файла в виде timestamp — количества миллисекунд, прошедших с 1 января 1970 года (Unix-время).
    new Date(file.lastModified).toLocaleDateString("en-US"),
    imageInfo,
  );
}

function addInfoItem(key, val, wrapper) {
  const p = document.createElement("p");
  p.innerHTML = `<b>${key}: </b>${val}`;
  p.className = "mb-2";
  wrapper.append(p);
}

// Разбор URL адреса
productForm["get-qp"].onclick = () => {
  const url = new URL(document.URL);
  for (let [name, value] of url.searchParams) {
    addInfoItem(name, value, qpInfo);
  }
};

console.log("Document location -", document.location);

toGoogleBtn.onclick = () => {
  window.location.assign("https://google.com");
};

// Выделение фрагментов документа
const range = new Range();
const startPoint = text.textContent.indexOf("Lorem");
range.setStart(text.firstChild, startPoint);
range.setEnd(text.firstChild, startPoint + 5);

document.getSelection().addRange(range);

// Отслеживание выделения
document.onselectionchange = () => {
  const selection = document.getSelection().toString();
  console.log(selection);
};
