import { Util } from './_util.js';

const App = {
  sayHelloTest: function(fName) {
    console.log(`Hello, ${fName}`);
  },
  init: function() {
    this.sayHelloTest('friend');
  },
};

export default App;
