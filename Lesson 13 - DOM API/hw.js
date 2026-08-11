const body = document.body;
const head = document.head;
const allBodyChildren = body.childNodes;

for (let node of allBodyChildren) {
  console.log("Body child -", node);
}

console.log(head.firstChild);
console.log(document.parentNode);
console.log(head.lastElementChild);
