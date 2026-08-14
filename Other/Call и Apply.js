const user = {
  name: "Toni",
};

function greet(who) {
  console.log(`Hello, ${who} form ${this.name}!`);
}

// Мы сами задаём, какой объект использовать в кач-ве this
greet.call(user, "Luda"); // fn.call(thisArg, arg1, arg2, arg3);
greet.apply(user, ["friend"]); // fn.apply(thisArg, [arg1, arg2, arg3]);

const boundGreet = greet.bind(user);
boundGreet("Luda"); // Hello, Luda form Toni!
