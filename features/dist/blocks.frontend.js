/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hero_frontend__ = __webpack_require__(/*! ./hero/frontend */ 16);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mailchimp_mailchimp_frontend__ = __webpack_require__(/*! ./mailchimp/mailchimp-frontend */ 17);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AmhReadmore_readmore_frontend__ = __webpack_require__(/*! ./AmhReadmore/readmore-frontend */ 18);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__readmore_readmore_frontend__ = __webpack_require__(/*! ./readmore/readmore-frontend */ 19);\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n\tvar hero = document.querySelectorAll(\".hero-paralax-wrap\");\n\tif (hero.length > 0) {\n\t\tObject(__WEBPACK_IMPORTED_MODULE_0__hero_frontend__[\"a\" /* default */])(hero);\n\t}\n\n\tvar submit = document.querySelector(\".wf-mc-submit\");\n\n\tif (submit) {\n\t\tObject(__WEBPACK_IMPORTED_MODULE_1__mailchimp_mailchimp_frontend__[\"a\" /* default */])(submit);\n\t}\n\n\tvar amhReadmore = document.querySelectorAll(\".amh-readmore-wrap\");\n\n\tif (amhReadmore) {\n\t\tObject(__WEBPACK_IMPORTED_MODULE_2__AmhReadmore_readmore_frontend__[\"a\" /* default */])(amhReadmore);\n\t}\n\tvar readmore = document.querySelectorAll(\".read-more-trigger\");\n\tif (readmore) {\n\t\tObject(__WEBPACK_IMPORTED_MODULE_3__readmore_readmore_frontend__[\"a\" /* default */])(readmore);\n\t}\n});\n\n// function toggleExpand(elem) {\n// \tconsole.log(elem);\n// \tconst target = elem.parentElement.querySelector(\".read-more-target\");\n// \ttarget.classList.toggle(\"collapsed\");\n// \ttarget.classList.toggle(\"expanded\");\n// \telem.innerHTML = target.classList.contains(\"collapsed\")\n// \t\t? \"Show less\"\n// \t\t: \"Show more\";\n// }\n\n// document.toggleExpand = toggleExpand;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZnJvbnRlbmQuanM/N2YyYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW5pdEhlcm8gZnJvbSBcIi4vaGVyby9mcm9udGVuZFwiO1xuaW1wb3J0IGluaXRNYWlsY2hpbXAgZnJvbSBcIi4vbWFpbGNoaW1wL21haWxjaGltcC1mcm9udGVuZFwiO1xuaW1wb3J0IGluaXRhbWhSZWFkbW9yZSBmcm9tIFwiLi9BbWhSZWFkbW9yZS9yZWFkbW9yZS1mcm9udGVuZFwiO1xuaW1wb3J0IGluaXRSZWFkbW9yZSBmcm9tIFwiLi9yZWFkbW9yZS9yZWFkbW9yZS1mcm9udGVuZFwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG5cdHZhciBoZXJvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5oZXJvLXBhcmFsYXgtd3JhcFwiKTtcblx0aWYgKGhlcm8ubGVuZ3RoID4gMCkge1xuXHRcdGluaXRIZXJvKGhlcm8pO1xuXHR9XG5cblx0dmFyIHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2YtbWMtc3VibWl0XCIpO1xuXG5cdGlmIChzdWJtaXQpIHtcblx0XHRpbml0TWFpbGNoaW1wKHN1Ym1pdCk7XG5cdH1cblxuXHR2YXIgYW1oUmVhZG1vcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFtaC1yZWFkbW9yZS13cmFwXCIpO1xuXG5cdGlmIChhbWhSZWFkbW9yZSkge1xuXHRcdGluaXRhbWhSZWFkbW9yZShhbWhSZWFkbW9yZSk7XG5cdH1cblx0dmFyIHJlYWRtb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yZWFkLW1vcmUtdHJpZ2dlclwiKTtcblx0aWYgKHJlYWRtb3JlKSB7XG5cdFx0aW5pdFJlYWRtb3JlKHJlYWRtb3JlKTtcblx0fVxufSk7XG5cbi8vIGZ1bmN0aW9uIHRvZ2dsZUV4cGFuZChlbGVtKSB7XG4vLyBcdGNvbnNvbGUubG9nKGVsZW0pO1xuLy8gXHRjb25zdCB0YXJnZXQgPSBlbGVtLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZWFkLW1vcmUtdGFyZ2V0XCIpO1xuLy8gXHR0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZShcImNvbGxhcHNlZFwiKTtcbi8vIFx0dGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRlZFwiKTtcbi8vIFx0ZWxlbS5pbm5lckhUTUwgPSB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29sbGFwc2VkXCIpXG4vLyBcdFx0PyBcIlNob3cgbGVzc1wiXG4vLyBcdFx0OiBcIlNob3cgbW9yZVwiO1xuLy8gfVxuXG4vLyBkb2N1bWVudC50b2dnbGVFeHBhbmQgPSB0b2dnbGVFeHBhbmQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZnJvbnRlbmQuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///15\n");

/***/ }),

/***/ 16:
/*!************************************!*\
  !*** ./src/hero/frontend/index.js ***!
  \************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (immutable) */ __webpack_exports__[\"a\"] = init;\nfunction init(hero) {\n\tvar heroVideo = document.querySelectorAll(\".hero-image-video\");\n\theroVideo.forEach(function (element) {\n\t\telement.onloadeddata = function () {\n\t\t\telement.classList.add(\"video-loaded\");\n\t\t};\n\t});\n\n\tvar myParalax = function myParalax(wraps) {\n\t\tvar ScrollPos;\n\t\tvar cache = [];\n\t\tvar loop = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {\n\t\t\treturn setTimeout(callback, 1000 / 60);\n\t\t};\n\n\t\tvar update = function update() {\n\t\t\tif (ScrollPos !== scrollY) {\n\t\t\t\tanimate();\n\t\t\t\tloop(update);\n\t\t\t\tScrollPos = scrollY;\n\t\t\t} else {\n\t\t\t\twindow.addEventListener(\"scroll\", update);\n\t\t\t}\n\t\t};\n\t\tvar animate = function animate() {\n\t\t\tcache.forEach(function (item) {\n\t\t\t\tvar pos = item.wrap.getBoundingClientRect();\n\t\t\t\tif (pos.top * -1 < pos.height && pos.top < pos.height) {\n\t\t\t\t\tvar top = pos.top * -0.5;\n\t\t\t\t\titem.element.style.transform = \"translate3d(0px,\" + top + \"px,0px)\";\n\t\t\t\t}\n\t\t\t});\n\t\t};\n\t\tvar init = function init() {\n\t\t\twraps.forEach(function (element) {\n\t\t\t\tcache.push({\n\t\t\t\t\telement: element,\n\t\t\t\t\twrap: element.parentElement\n\t\t\t\t});\n\t\t\t});\n\t\t};\n\n\t\tif (window.innerWidth > 450) {\n\t\t\tinit();\n\t\t\tupdate();\n\t\t}\n\t};\n\n\tmyParalax(hero);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTYuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaGVyby9mcm9udGVuZC9pbmRleC5qcz9hMDU4Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoaGVybykge1xuXHR2YXIgaGVyb1ZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5oZXJvLWltYWdlLXZpZGVvXCIpO1xuXHRoZXJvVmlkZW8uZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdGVsZW1lbnQub25sb2FkZWRkYXRhID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidmlkZW8tbG9hZGVkXCIpO1xuXHRcdH07XG5cdH0pO1xuXG5cdHZhciBteVBhcmFsYXggPSBmdW5jdGlvbiBteVBhcmFsYXgod3JhcHMpIHtcblx0XHR2YXIgU2Nyb2xsUG9zO1xuXHRcdHZhciBjYWNoZSA9IFtdO1xuXHRcdHZhciBsb29wID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG5cdFx0fTtcblxuXHRcdHZhciB1cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoKSB7XG5cdFx0XHRpZiAoU2Nyb2xsUG9zICE9PSBzY3JvbGxZKSB7XG5cdFx0XHRcdGFuaW1hdGUoKTtcblx0XHRcdFx0bG9vcCh1cGRhdGUpO1xuXHRcdFx0XHRTY3JvbGxQb3MgPSBzY3JvbGxZO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdXBkYXRlKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdHZhciBhbmltYXRlID0gZnVuY3Rpb24gYW5pbWF0ZSgpIHtcblx0XHRcdGNhY2hlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdFx0dmFyIHBvcyA9IGl0ZW0ud3JhcC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0aWYgKHBvcy50b3AgKiAtMSA8IHBvcy5oZWlnaHQgJiYgcG9zLnRvcCA8IHBvcy5oZWlnaHQpIHtcblx0XHRcdFx0XHR2YXIgdG9wID0gcG9zLnRvcCAqIC0wLjU7XG5cdFx0XHRcdFx0aXRlbS5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoMHB4LFwiICsgdG9wICsgXCJweCwwcHgpXCI7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH07XG5cdFx0dmFyIGluaXQgPSBmdW5jdGlvbiBpbml0KCkge1xuXHRcdFx0d3JhcHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0XHRjYWNoZS5wdXNoKHtcblx0XHRcdFx0XHRlbGVtZW50OiBlbGVtZW50LFxuXHRcdFx0XHRcdHdyYXA6IGVsZW1lbnQucGFyZW50RWxlbWVudFxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRpZiAod2luZG93LmlubmVyV2lkdGggPiA0NTApIHtcblx0XHRcdGluaXQoKTtcblx0XHRcdHVwZGF0ZSgpO1xuXHRcdH1cblx0fTtcblxuXHRteVBhcmFsYXgoaGVybyk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaGVyby9mcm9udGVuZC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///16\n");

/***/ }),

/***/ 17:
/*!*********************************************!*\
  !*** ./src/mailchimp/mailchimp-frontend.js ***!
  \*********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (immutable) */ __webpack_exports__[\"a\"] = init;\n// jQuery(function($) {\n//   $(document).ready(function() {\n//     $(\".wf-mc-submit\").on(\"click\", function() {\n//       var $parent = $(this).parent();\n//       var $this = $(this);\n//       $this.attr(\"disabled\", \"disabled\");\n//       var form_name = $(this)\n//         .siblings(\".wf-mc-name\")\n//         .val();\n//       var form_email = $(this)\n//         .siblings(\".wf-mc-email\")\n//         .val();\n\n//       $.ajax({\n//         url: wf_mailchimp_block.ajaxurl,\n//         method: \"POST\",\n//         crossDomain: true,\n//         dataType: \"json\",\n//         data: {\n//           action: \"wf_mailchimp_block_submit_form\",\n//           name: form_name,\n//           email: form_email\n//         }\n//       })\n//         .success(function(response) {\n//           if (response.data == \"1\") {\n//             alert($parent.data(\"success\"));\n//           } else if (response.data == \"2\") {\n//             alert($parent.data(\"error\"));\n//           } else if (response.data == \"3\") {\n//             alert($parent.data(\"duplicate\"));\n//           } else if (response.data == \"4\") {\n//             alert($parent.data(\"submit\"));\n//           } else {\n//             alert(\"An unknown error occured.\");\n//           }\n//           $this.removeAttr(\"disabled\");\n//         })\n//         .error(function(type) {\n//           alert(\"An unknown error occured.\");\n//         });\n//     });\n//   });\n// });\n\n// document.addEventListener(\"DOMContentLoaded\", function() {\n// \tlet submit = document.querySelector(\".wf-mc-submit\");\n// \tif (wf_mailchimp_block.ajaxurl && submit) {\n// \t\tinit(submit);\n// \t}\n// });\n\nfunction init(submit) {\n\tsubmit.addEventListener(\"click\", makeRequest);\n\n\tfunction makeRequest() {\n\t\tvar name = document.querySelector(\".wf-mc-name\").value;\n\t\tvar email = document.querySelector(\".wf-mc-email\").value;\n\t\tvar post_id = document.querySelector(\".wp-block-webfactory-mailchimp-wrap\").dataset.post_id;\n\n\t\tvar data = \"action=wf_mailchimp_block_submit_form&name=\" + name + \"&email=\" + email + \"&post_id=\" + post_id + \"&payload=submit\";\n\n\t\tfetch(ku_block.ajaxurl, {\n\t\t\tmethod: \"POST\", // or 'PUT'\n\t\t\theaders: new Headers({\n\t\t\t\t\"Content-Type\": \"application/x-www-form-urlencoded\"\n\t\t\t}),\n\t\t\tcredentials: \"same-origin\",\n\t\t\tbody: data\n\t\t}).then(function (response) {\n\t\t\treturn response.json();\n\t\t}).then(function (data) {\n\t\t\tconsole.log(\"Success:\", data);\n\t\t}).catch(function (error) {\n\t\t\tconsole.error(\"Error:\", error);\n\t\t});\n\t}\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTcuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbWFpbGNoaW1wL21haWxjaGltcC1mcm9udGVuZC5qcz9iNDBjIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGpRdWVyeShmdW5jdGlvbigkKSB7XG4vLyAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuLy8gICAgICQoXCIud2YtbWMtc3VibWl0XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4vLyAgICAgICB2YXIgJHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XG4vLyAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuLy8gICAgICAgJHRoaXMuYXR0cihcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4vLyAgICAgICB2YXIgZm9ybV9uYW1lID0gJCh0aGlzKVxuLy8gICAgICAgICAuc2libGluZ3MoXCIud2YtbWMtbmFtZVwiKVxuLy8gICAgICAgICAudmFsKCk7XG4vLyAgICAgICB2YXIgZm9ybV9lbWFpbCA9ICQodGhpcylcbi8vICAgICAgICAgLnNpYmxpbmdzKFwiLndmLW1jLWVtYWlsXCIpXG4vLyAgICAgICAgIC52YWwoKTtcblxuLy8gICAgICAgJC5hamF4KHtcbi8vICAgICAgICAgdXJsOiB3Zl9tYWlsY2hpbXBfYmxvY2suYWpheHVybCxcbi8vICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbi8vICAgICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4vLyAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcbi8vICAgICAgICAgZGF0YToge1xuLy8gICAgICAgICAgIGFjdGlvbjogXCJ3Zl9tYWlsY2hpbXBfYmxvY2tfc3VibWl0X2Zvcm1cIixcbi8vICAgICAgICAgICBuYW1lOiBmb3JtX25hbWUsXG4vLyAgICAgICAgICAgZW1haWw6IGZvcm1fZW1haWxcbi8vICAgICAgICAgfVxuLy8gICAgICAgfSlcbi8vICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YSA9PSBcIjFcIikge1xuLy8gICAgICAgICAgICAgYWxlcnQoJHBhcmVudC5kYXRhKFwic3VjY2Vzc1wiKSk7XG4vLyAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5kYXRhID09IFwiMlwiKSB7XG4vLyAgICAgICAgICAgICBhbGVydCgkcGFyZW50LmRhdGEoXCJlcnJvclwiKSk7XG4vLyAgICAgICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5kYXRhID09IFwiM1wiKSB7XG4vLyAgICAgICAgICAgICBhbGVydCgkcGFyZW50LmRhdGEoXCJkdXBsaWNhdGVcIikpO1xuLy8gICAgICAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuZGF0YSA9PSBcIjRcIikge1xuLy8gICAgICAgICAgICAgYWxlcnQoJHBhcmVudC5kYXRhKFwic3VibWl0XCIpKTtcbi8vICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgYWxlcnQoXCJBbiB1bmtub3duIGVycm9yIG9jY3VyZWQuXCIpO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICAkdGhpcy5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgICAgIC5lcnJvcihmdW5jdGlvbih0eXBlKSB7XG4vLyAgICAgICAgICAgYWxlcnQoXCJBbiB1bmtub3duIGVycm9yIG9jY3VyZWQuXCIpO1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9KTtcbi8vICAgfSk7XG4vLyB9KTtcblxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4vLyBcdGxldCBzdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndmLW1jLXN1Ym1pdFwiKTtcbi8vIFx0aWYgKHdmX21haWxjaGltcF9ibG9jay5hamF4dXJsICYmIHN1Ym1pdCkge1xuLy8gXHRcdGluaXQoc3VibWl0KTtcbi8vIFx0fVxuLy8gfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXQoc3VibWl0KSB7XG5cdHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWFrZVJlcXVlc3QpO1xuXG5cdGZ1bmN0aW9uIG1ha2VSZXF1ZXN0KCkge1xuXHRcdHZhciBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53Zi1tYy1uYW1lXCIpLnZhbHVlO1xuXHRcdHZhciBlbWFpbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2YtbWMtZW1haWxcIikudmFsdWU7XG5cdFx0dmFyIHBvc3RfaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndwLWJsb2NrLXdlYmZhY3RvcnktbWFpbGNoaW1wLXdyYXBcIikuZGF0YXNldC5wb3N0X2lkO1xuXG5cdFx0dmFyIGRhdGEgPSBcImFjdGlvbj13Zl9tYWlsY2hpbXBfYmxvY2tfc3VibWl0X2Zvcm0mbmFtZT1cIiArIG5hbWUgKyBcIiZlbWFpbD1cIiArIGVtYWlsICsgXCImcG9zdF9pZD1cIiArIHBvc3RfaWQgKyBcIiZwYXlsb2FkPXN1Ym1pdFwiO1xuXG5cdFx0ZmV0Y2goa3VfYmxvY2suYWpheHVybCwge1xuXHRcdFx0bWV0aG9kOiBcIlBPU1RcIiwgLy8gb3IgJ1BVVCdcblx0XHRcdGhlYWRlcnM6IG5ldyBIZWFkZXJzKHtcblx0XHRcdFx0XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxuXHRcdFx0fSksXG5cdFx0XHRjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuXHRcdFx0Ym9keTogZGF0YVxuXHRcdH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cdFx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHRcdH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiU3VjY2VzczpcIiwgZGF0YSk7XG5cdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3I6XCIsIGVycm9yKTtcblx0XHR9KTtcblx0fVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21haWxjaGltcC9tYWlsY2hpbXAtZnJvbnRlbmQuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///17\n");

/***/ }),

/***/ 18:
/*!**********************************************!*\
  !*** ./src/AmhReadmore/readmore-frontend.js ***!
  \**********************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (immutable) */ __webpack_exports__[\"a\"] = init;\nfunction init() {\n\tvar buttons = document.querySelectorAll(\".amh-readmore-item-arrow\");\n\tvar items = document.querySelectorAll(\".amh-readmore-subContent\");\n\tbuttons.forEach(function (b) {\n\t\tb.addEventListener(\"click\", buttonClicked, false);\n\t});\n\tfunction buttonClicked(e) {\n\t\thandleclick(e.target);\n\t}\n\n\tfunction handleclick(target) {\n\t\tvar id = target.dataset.id;\n\t\tif (target.classList.contains(\"amh-readmore-item-arrow-active\")) {\n\t\t\tid = 0;\n\t\t}\n\t\thandlebuttons(id);\n\t\thandleContent(id);\n\t}\n\tfunction handleContent(id) {\n\t\titems.forEach(function (item) {\n\t\t\tif (item.dataset.id === id) {\n\t\t\t\titem.classList.add(\"amh-readmore-subContent-active\");\n\t\t\t\twindow.scrollTo({\n\t\t\t\t\ttop: item.getBoundingClientRect().top + window.scrollY - 300,\n\t\t\t\t\tbehavior: \"smooth\"\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\titem.classList.remove(\"amh-readmore-subContent-active\");\n\t\t\t}\n\t\t});\n\t}\n\tfunction handlebuttons(id) {\n\t\tbuttons.forEach(function (button) {\n\t\t\tif (button.dataset.id === id) {\n\t\t\t\tbutton.classList.add(\"amh-readmore-item-arrow-active\");\n\t\t\t} else {\n\t\t\t\tbutton.classList.remove(\"amh-readmore-item-arrow-active\");\n\t\t\t}\n\t\t});\n\t}\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQW1oUmVhZG1vcmUvcmVhZG1vcmUtZnJvbnRlbmQuanM/MTY0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KCkge1xuXHR2YXIgYnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYW1oLXJlYWRtb3JlLWl0ZW0tYXJyb3dcIik7XG5cdHZhciBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYW1oLXJlYWRtb3JlLXN1YkNvbnRlbnRcIik7XG5cdGJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbiAoYikge1xuXHRcdGIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGJ1dHRvbkNsaWNrZWQsIGZhbHNlKTtcblx0fSk7XG5cdGZ1bmN0aW9uIGJ1dHRvbkNsaWNrZWQoZSkge1xuXHRcdGhhbmRsZWNsaWNrKGUudGFyZ2V0KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZWNsaWNrKHRhcmdldCkge1xuXHRcdHZhciBpZCA9IHRhcmdldC5kYXRhc2V0LmlkO1xuXHRcdGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW1oLXJlYWRtb3JlLWl0ZW0tYXJyb3ctYWN0aXZlXCIpKSB7XG5cdFx0XHRpZCA9IDA7XG5cdFx0fVxuXHRcdGhhbmRsZWJ1dHRvbnMoaWQpO1xuXHRcdGhhbmRsZUNvbnRlbnQoaWQpO1xuXHR9XG5cdGZ1bmN0aW9uIGhhbmRsZUNvbnRlbnQoaWQpIHtcblx0XHRpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHRpZiAoaXRlbS5kYXRhc2V0LmlkID09PSBpZCkge1xuXHRcdFx0XHRpdGVtLmNsYXNzTGlzdC5hZGQoXCJhbWgtcmVhZG1vcmUtc3ViQ29udGVudC1hY3RpdmVcIik7XG5cdFx0XHRcdHdpbmRvdy5zY3JvbGxUbyh7XG5cdFx0XHRcdFx0dG9wOiBpdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5zY3JvbGxZIC0gMzAwLFxuXHRcdFx0XHRcdGJlaGF2aW9yOiBcInNtb290aFwiXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYW1oLXJlYWRtb3JlLXN1YkNvbnRlbnQtYWN0aXZlXCIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdGZ1bmN0aW9uIGhhbmRsZWJ1dHRvbnMoaWQpIHtcblx0XHRidXR0b25zLmZvckVhY2goZnVuY3Rpb24gKGJ1dHRvbikge1xuXHRcdFx0aWYgKGJ1dHRvbi5kYXRhc2V0LmlkID09PSBpZCkge1xuXHRcdFx0XHRidXR0b24uY2xhc3NMaXN0LmFkZChcImFtaC1yZWFkbW9yZS1pdGVtLWFycm93LWFjdGl2ZVwiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYW1oLXJlYWRtb3JlLWl0ZW0tYXJyb3ctYWN0aXZlXCIpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvQW1oUmVhZG1vcmUvcmVhZG1vcmUtZnJvbnRlbmQuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///18\n");

/***/ }),

/***/ 19:
/*!*******************************************!*\
  !*** ./src/readmore/readmore-frontend.js ***!
  \*******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (immutable) */ __webpack_exports__[\"a\"] = init;\nfunction init(elems) {\n\telems.forEach(function (element) {\n\t\telement.addEventListener(\"click\", toggleExpand);\n\t});\n\n\tfunction toggleExpand(elem) {\n\t\tvar target = elem.target.parentElement.parentElement.querySelector(\".read-more-target\");\n\t\ttarget.classList.toggle(\"collapsed\");\n\t\ttarget.classList.toggle(\"expanded\");\n\t\telem.target.innerHTML = target.classList.contains(\"collapsed\") ? elem.target.dataset.more : elem.target.dataset.less;\n\t}\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTkuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcmVhZG1vcmUvcmVhZG1vcmUtZnJvbnRlbmQuanM/NzI2MiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0KGVsZW1zKSB7XG5cdGVsZW1zLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcblx0XHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVFeHBhbmQpO1xuXHR9KTtcblxuXHRmdW5jdGlvbiB0b2dnbGVFeHBhbmQoZWxlbSkge1xuXHRcdHZhciB0YXJnZXQgPSBlbGVtLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZWFkLW1vcmUtdGFyZ2V0XCIpO1xuXHRcdHRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKFwiY29sbGFwc2VkXCIpO1xuXHRcdHRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKFwiZXhwYW5kZWRcIik7XG5cdFx0ZWxlbS50YXJnZXQuaW5uZXJIVE1MID0gdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNvbGxhcHNlZFwiKSA/IGVsZW0udGFyZ2V0LmRhdGFzZXQubW9yZSA6IGVsZW0udGFyZ2V0LmRhdGFzZXQubGVzcztcblx0fVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3JlYWRtb3JlL3JlYWRtb3JlLWZyb250ZW5kLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///19\n");

/***/ })

/******/ });