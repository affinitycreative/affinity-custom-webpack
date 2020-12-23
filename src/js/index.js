//import './sass/style.scss'; //using node sass not webpack to compile sass - check package.json

//if global/window jquery needs to be exposed
//global.$ = $;

import $ from 'jquery';

//vendor files if NPM package isn't available
import './vendor/slick';

//our files
import App from './app';

$(() => {
  // Initialize global modules
  App.init();
});
