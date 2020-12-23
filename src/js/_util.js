import { gsap, ScrollToPlugin, Draggable, MotionPathPlugin } from 'gsap/all';

// global.$ = window.jQuery = jQuery;

const Util = {
  $body: $('body'),
  wWidth: $(window).innerWidth(),
  wHeight: $(window).innerHeight(),
  $window: $(window),
  dataTrans: '', //name of transition
  previousDataTrans: '', //name of previous transition
  dataPage: '', //after using barba name of page
  pageType: '', //either primary or secondary page - not always checked atm 3 march
  primaryPage: false,
  $curtain: $('.curtain-call'),
  $chatContainer: $('.chat-widget-container'),
  isMobile: function () {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i250|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      return true;
    } else {
      return false;
    }
  },
  getURLPath: function () {
    //   !!Important that permalink in settings does not have trailing '/'
    this.parsedUrl = new URL(window.location.href);

    // const regex = /\//ig;

    // let justThePath = this.parsedUrl.pathname.replace(regex,'')

    return this.parsedUrl.pathname; //.split("/")[1]
  },
  getRootURLPath: function () {
    //   !!Important that permalink in settings does not have trailing '/'
    this.parsedUrl = new URL(window.location.href);

    return this.parsedUrl.pathname.split('/')[1];
  },
  getExtendedURLPath: function () {
    this.parsedUrl = new URL(window.location.href);

    return this.parsedUrl.pathname;
  },
  searchPageUrl: function (findPage) {
    this.parsedUrl = new URL(window.location.href);

    let urlArray = this.parsedUrl.pathname.split('/');

    let findPath = urlArray.includes(findPage, 1) ? true : false;

    return findPath;
  },
  searchPathNameArray: function (match) {
    //used to find say 'product' in /store/product/2019...
    let pathArray = window.location.pathname.split('/');

    let found;

    pathArray.find((el, idx) =>
      el === match ? (found = true) : (found = false)
    );

    return found;
  },
  keys: { 37: 1, 38: 1, 39: 1, 40: 1 }, // left: 37, up: 38, right: 39, down: 40, // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  preventDefault: function (e) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
      e.returnValue = false;
    }
  },
  preventDefaultForScrollKeys: function (e) {
    if (Util.keys[e.keyCode]) {
      e.preventDefault();
      return false;
    }
  },
  disableScroll: function (yPixel) {
    if (window.addEventListener) {
      // older FF
      window.addEventListener('DOMMouseScroll', this.preventDefault, {
        passive: false,
      });
      document.addEventListener('wheel', this.preventDefault, {
        passive: false,
      }); // Disable scrolling in Chrome
      document.addEventListener('touchmove', this.preventDefault, {
        passive: false,
      }); // mobile
      window.onwheel = this.preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
      window.ontouchmove = this.preventDefault; // mobile
      document.onkeydown = this.preventDefaultForScrollKeys;
    }
  },
  enableScroll: function (yPixel) {
    if (window.removeEventListener) {
      window.removeEventListener('DOMMouseScroll', this.preventDefault, {
        passive: false,
      });
      document.removeEventListener('wheel', this.preventDefault, {
        passive: false,
      }); // Enable scrolling in Chrome
      document.removeEventListener('touchmove', this.preventDefault, {
        passive: false,
      }); // mobile
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    }
  },
  setCookie: function (name, value, days) {
    let expires = '';
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },
  getCookie: function (name) {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (' ' == c.charAt(0)) c = c.substring(1, c.length);
      if (0 == c.indexOf(nameEQ)) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: function (name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  },
  parseQuery: function (queryString) {
    let query = {};
    let pairs = ('?' === queryString[0]
      ? queryString.substr(1)
      : queryString
    ).split('&');
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  },
  pad(num, size) {
    return ('000000000' + num).substr(-size);
  },
  setCSSvariable: function () {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight / 100}px`
    );
  },
  unFocus: function () {
    if (!document || !window) {
      return;
    }

    var styleText =
      '::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;';
    var unfocus_style = document.createElement('STYLE');

    window.unfocus = function () {
      document.getElementsByTagName('HEAD')[0].appendChild(unfocus_style);

      document.addEventListener('mousedown', function () {
        unfocus_style.innerHTML = styleText + '}';
      });
      document.addEventListener('keydown', function () {
        unfocus_style.innerHTML = '';
      });
    };

    unfocus.style = function (style) {
      styleText += style;
    };

    unfocus();
  },
  init: function () {},
}; //app

export { Util };
//window.Util = Util;
