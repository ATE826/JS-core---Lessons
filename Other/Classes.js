class User {
  // Приватные переменные
  #firstName;
  #lastName;
  #age;

  constructor(firstName, lastName, age) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#age = age;
  }

  set(firstName, lastName, age) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#age = age;
  }

  getObject() {
    return {
      firstName: this.#firstName,
      lastName: this.#lastName,
      age: this.#age,
    };
  }

  getArray() {
    return [this.#firstName, this.#lastName, this.#age];
  }
}

const user1 = new User("Toni", "Asey", 20);
user1.set("Toni", "Tsey", 21);
console.log(user1.getObject());
console.log(user1.getArray());
