function addInfoItem(key, val, infoMsg) {
  const div = document.createElement("div");
  div.classList.add("mb-2");
  div.innerHTML = `<b>${key}:</b> ${val}`;
  infoMsg.append(div);
}

export { addInfoItem };
