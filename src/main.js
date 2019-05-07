import sketch from "sketch";
import inputModal from "./inputModal";

var document = sketch.getSelectedDocument();
var selectedLayers = document.selectedLayers;
var selectedCount = selectedLayers.length;
var Shape = require("sketch/dom").Shape;
var Group = require("sketch/dom").Group;
var UI = require("sketch/ui");

var selectErrorMsg = "Select a layer";

export function gutters() {
  if (selectedCount === 0) {
    return UI.message(selectErrorMsg);
  }

  var input = inputModal("GUTTERS", 0, "gutterKey1", "gutterKey2");

  var createGrid = (num, val) => {
    selectedLayers.forEach(item => {
      var gutterAmount = parseInt(input.colAmount) + num;

      var colWidth =
        (item.frame.width - gutterAmount * input.gutterWidth) / input.colAmount;

      var gutterX = (index, val1) => {
        return Math.trunc(
          item.frame.x + input.gutterWidth * index + colWidth * (index + val1)
        );
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
              borders: [{ thickness: 0 }]
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

export function columns() {
  if (selectedCount === 0) {
    return UI.message(selectErrorMsg);
  }

  var input = inputModal("COLUMNS", -1, "colKey1", "colKey2");

  selectedLayers.forEach(item => {
    var gutterXList = [];

    var calGutterX = (num, val) => {
      var gutterAmount = parseInt(input.colAmount) + num;
      var totalWidth = input.gutterWidth * gutterAmount;
      var colWidth =
        (item.frame.width - gutterAmount * input.gutterWidth) / input.colAmount;

      var gutterX = (index, val1) => {
        return Math.trunc(
          item.frame.x + input.gutterWidth * index + colWidth * (index + val1)
        );
      };

      for (var i = 0; i < gutterAmount; i++) {
        gutterXList.push(gutterX(i, val));
      }
      return totalWidth;
    };

    var createGrid = val => {
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
        var columnWidth =
          gutterXList[i + 1] - gutterXList[i] - Number(input.gutterWidth);
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
            borders: [{ thickness: 0 }]
          }
        });

        if (input.gutterWidth == 0) {
          if (i % 2 == 0) {
            column.style.opacity = 0.4;
          } else column.style.opacity = 0.5;
        } else {
          column.style.opacity = 0.4;
        }
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
