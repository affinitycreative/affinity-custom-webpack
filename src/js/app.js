console.log("app.js speaking");
import { app } from "./_util.js";
import barba from "@barba/core";

console.log(app);

const sayHelloTest = (fName) => {
  console.log(`Hello, ${fName}`);
};

sayHelloTest("Trent");
