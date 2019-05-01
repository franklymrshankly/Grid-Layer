var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/column.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/column.js":
/*!***********************!*\
  !*** ./src/column.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ "./src/main.js");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  var Shape = __webpack_require__(/*! sketch/dom */ "sketch/dom").Shape;

  var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();

  var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

  var selectedLayers = document.selectedLayers;
  var Main = Object(_main__WEBPACK_IMPORTED_MODULE_1__["default"])("COLUMNS", -1);
  selectedLayers.forEach(function (item) {
    var gutterXList = [];

    var calGutterX = function calGutterX(num, val) {
      var gutterAmount = parseInt(Main.colAmount) + num;
      var totalWidth = Main.gutterWidth * gutterAmount;
      var colWidth = (item.frame.width - gutterAmount * Main.gutterWidth) / Main.colAmount;

      var gutterX = function gutterX(index, val1) {
        return Math.trunc(item.frame.x + Main.gutterWidth * index + colWidth * (index + val1));
      };

      for (var i = 0; i < gutterAmount; i++) {
        gutterXList.push(gutterX(i, val));
      }

      return totalWidth;
    };

    var createGrid = function createGrid(val) {
      var currentWidth = 0;
      var group = new Group({
        name: "Columns",
        parent: item.parent
      });
      group.frame.x = item.frame.x;
      group.frame.y = item.frame.y;
      group.frame.width = item.frame.width;
      group.frame.height = item.frame.height;

      for (var i = 0; i < gutterXList.length - 1; i++) {
        var columnWidth = gutterXList[i + 1] - gutterXList[i] - Number(Main.gutterWidth);
        currentWidth = currentWidth + columnWidth;
        var columnX = Main.gutterWidth * i + currentWidth - columnWidth + val;
        var column = new Shape({
          name: "Column",
          parent: group,
          frame: {
            height: item.frame.height,
            x: columnX,
            width: columnWidth,
            y: 0
          },
          style: {
            fills: ["#00A2FF"],
            borders: [{
              thickness: 0
            }]
          }
        });

        if (i % 2 == 0) {
          column.style.opacity = 0.4;
        } else column.style.opacity = 0.5;
      }
    };

    if (Main.outsideGutter === "Yes") {
      if (item.frame.width > calGutterX(1, 0)) {
        createGrid(Number(Main.gutterWidth));
      } else {
        return UI.message("Gutters are too big for " + item.name);
      }
    }

    if (Main.outsideGutter === "No") {
      if (item.frame.width > calGutterX(-1, 1)) {
        gutterXList.unshift(item.frame.x - Main.gutterWidth);
        gutterXList.push(item.frame.x + item.frame.width);
        createGrid(0);
      } else {
        return UI.message("Gutters are too big for " + item.name);
      }
    }
  });
});

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function (type, min) {
  var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
  var selectedLayers = document.selectedLayers;
  var selectedCount = selectedLayers.length;

  var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

  var options = ["Yes", "No"];
  var outsideGutter = null;
  var colAmountMessage = "Column amount";
  var colAmount = 12;
  var colAmountIsNan = true;
  var gutterWidthMessage = "Gutter width";
  var gutterWidth = 12;
  var gutterWidthIsNaN = true;
  var complete = true;

  if (selectedCount === 0) {
    return UI.message("Select a layer");
  }

  UI.getInputFromUser(type + " - Gutters on the outside?", {
    type: UI.INPUT_TYPE.selection,
    possibleValues: options
  }, function (err, value) {
    if (err) {
      complete = false;
      return;
    }

    outsideGutter = value;
  });

  if (complete === true) {
    while (colAmountIsNan) {
      UI.getInputFromUser(colAmountMessage, {
        initialValue: colAmount
      }, function (err, value) {
        if (err) {
          complete = false;
          colAmountIsNan = false;
          colAmount = 12;
          return;
        }

        colAmount = value;
        colAmountMessage = "Column amount - is not a number";
      });

      if (!isNaN(colAmount)) {
        colAmountIsNan = false;
      }

      if (colAmount <= 0) {
        colAmountMessage = "Column amount - enter a number above 0";
        colAmountIsNan = true;
      }
    }

    if (complete === true) {
      while (gutterWidthIsNaN) {
        UI.getInputFromUser(gutterWidthMessage, {
          initialValue: gutterWidth
        }, function (err, value) {
          if (err) {
            complete = false;
            gutterWidthIsNaN = false;
            gutterWidth = 12;
            return;
          }

          gutterWidth = value;
          gutterWidthMessage = "Gutter width - is not a number";
        });

        if (!isNaN(gutterWidth)) {
          gutterWidthIsNaN = false;
        }

        if (gutterWidth <= min) {
          var message = null;

          if (min == 0) {
            message = "Gutter width - enter a number above 0";
          } else {
            message = "Gutter width - enter a positive number";
          }

          gutterWidthMessage = message;
          gutterWidthIsNaN = true;
        }
      }
    }
  }

  return {
    outsideGutter: outsideGutter,
    colAmount: colAmount,
    gutterWidth: gutterWidth,
    complete: complete
  };
});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=column.js.map