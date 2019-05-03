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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/inputModal.js":
/*!***************************!*\
  !*** ./src/inputModal.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (type, min, key1, key2) {
  var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

  var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

  var selectorComplete = true;
  var options = ["Yes", "No"];
  var outsideGutter = null;
  var colAmountIsNan = true;
  var colAmountMessage = "Column amount";
  var colAmount = null;
  var colAmountComplete = true;
  var gutterWidthIsNaN = true;
  var gutterWidthMessage = "Gutter width";
  var gutterWidth = null;
  var inputComplete = true;
  var settingsCol = Settings.settingForKey(key1);
  var settingsGutter = Settings.settingForKey(key2);

  if (settingsCol) {
    colAmount = settingsCol;
  } else {
    colAmount = 12;
  }

  if (settingsGutter) {
    gutterWidth = settingsGutter;
  } else {
    gutterWidth = 12;
  }

  UI.getInputFromUser(type + " - Gutters on the outside?", {
    type: UI.INPUT_TYPE.selection,
    possibleValues: options
  }, function (err, value) {
    if (err) {
      selectorComplete = false;
      return;
    }

    outsideGutter = value;
  });

  if (selectorComplete) {
    while (colAmountIsNan) {
      UI.getInputFromUser(colAmountMessage, {
        initialValue: colAmount
      }, function (err, value) {
        if (err) {
          colAmountComplete = false;
          inputComplete = false;
          colAmountIsNan = false;
          return;
        }

        Settings.setSettingForKey(key1, value);
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

    if (colAmountComplete) {
      while (gutterWidthIsNaN) {
        UI.getInputFromUser(gutterWidthMessage, {
          initialValue: gutterWidth
        }, function (err, value) {
          if (err) {
            inputComplete = false;
            gutterWidthIsNaN = false;
            return;
          }

          Settings.setSettingForKey(key2, value);
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
    inputComplete: inputComplete
  };
});

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: gutters, columns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gutters", function() { return gutters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "columns", function() { return columns; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _inputModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputModal */ "./src/inputModal.js");


var document = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
var selectedLayers = document.selectedLayers;
var selectedCount = selectedLayers.length;

var Shape = __webpack_require__(/*! sketch/dom */ "sketch/dom").Shape;

var Group = __webpack_require__(/*! sketch/dom */ "sketch/dom").Group;

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var selectErrorMsg = "Select a layer";
function gutters() {
  if (selectedCount === 0) {
    return UI.message(selectErrorMsg);
  }

  var input = Object(_inputModal__WEBPACK_IMPORTED_MODULE_1__["default"])("GUTTERS", 0, "gutterKey1", "gutterKey2");

  var createGrid = function createGrid(num, val) {
    selectedLayers.forEach(function (item) {
      var gutterAmount = parseInt(input.colAmount) + num;
      var colWidth = (item.frame.width - gutterAmount * input.gutterWidth) / input.colAmount;

      var gutterX = function gutterX(index, val1) {
        return Math.trunc(item.frame.x + input.gutterWidth * index + colWidth * (index + val1));
      };

      var totalWidth = input.gutterWidth * gutterAmount;

      if (item.frame.width > totalWidth) {
        var group = new Group({
          name: "Gutter",
          parent: item.parent
        });

        for (var i = 0; i < gutterAmount; i++) {
          var gutter = new Shape({
            name: "Gutter",
            parent: group,
            frame: {
              height: item.frame.height,
              width: input.gutterWidth,
              x: gutterX(i, val),
              y: item.frame.y
            },
            style: {
              fills: ["#ff0000"],
              opacity: 0.5,
              borders: [{
                thickness: 0
              }]
            }
          });
        }

        group.adjustToFit();
      } else {
        return UI.message("Gutters are too big for " + item.name);
      }
    });
  };

  if (input.outsideGutter === "Yes") {
    if (input.inputComplete) {
      createGrid(1, 0);
    }
  }

  if (input.outsideGutter === "No") {
    if (input.inputComplete) {
      createGrid(-1, 1);
    }
  }
}
function columns() {
  if (selectedCount === 0) {
    return UI.message(selectErrorMsg);
  }

  var input = Object(_inputModal__WEBPACK_IMPORTED_MODULE_1__["default"])("COLUMNS", -1, "colKey1", "colKey2");
  selectedLayers.forEach(function (item) {
    var gutterXList = [];

    var calGutterX = function calGutterX(num, val) {
      var gutterAmount = parseInt(input.colAmount) + num;
      var totalWidth = input.gutterWidth * gutterAmount;
      var colWidth = (item.frame.width - gutterAmount * input.gutterWidth) / input.colAmount;

      var gutterX = function gutterX(index, val1) {
        return Math.trunc(item.frame.x + input.gutterWidth * index + colWidth * (index + val1));
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
        var columnWidth = gutterXList[i + 1] - gutterXList[i] - Number(input.gutterWidth);
        currentWidth = currentWidth + columnWidth;
        var columnX = input.gutterWidth * i + currentWidth - columnWidth + val;
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

    if (input.outsideGutter === "Yes") {
      if (item.frame.width > calGutterX(1, 0)) {
        if (input.inputComplete) {
          createGrid(Number(input.gutterWidth));
        }
      } else {
        return UI.message("Gutters are too big for " + item.name);
      }
    }

    if (input.outsideGutter === "No") {
      if (item.frame.width > calGutterX(-1, 1)) {
        gutterXList.unshift(item.frame.x - input.gutterWidth);
        gutterXList.push(item.frame.x + item.frame.width);

        if (input.inputComplete) {
          createGrid(0);
        }
      } else {
        return UI.message("Gutters are too big for " + item.name);
      }
    }
  });
}

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

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

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
that['gutters'] = __skpm_run.bind(this, 'gutters');
that['onRun'] = __skpm_run.bind(this, 'default');
that['columns'] = __skpm_run.bind(this, 'columns')

//# sourceMappingURL=main.js.map