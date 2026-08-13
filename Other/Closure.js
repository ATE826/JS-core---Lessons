// Замыкание (closure) — это функция вместе с лексическим окружением, в котором она была создана.

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

for (let i = 0; i < 5; i++) {
  console.log(counter());
}
