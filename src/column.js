import sketch from "sketch";
import main from "./main";

export default function() {
  var Shape = require("sketch/dom").Shape;
  var UI = require("sketch/ui");
  var document = sketch.getSelectedDocument();
  var Group = require("sketch/dom").Group;
  var selectedLayers = document.selectedLayers;
  var Main = main("COLUMNS", -1);

  selectedLayers.forEach(item => {
    var gutterXList = [];

    var calGutterX = (num, val) => {
      var gutterAmount = parseInt(Main.colAmount) + num;
      var totalWidth = Main.gutterWidth * gutterAmount;
      var colWidth =
        (item.frame.width - gutterAmount * Main.gutterWidth) / Main.colAmount;

      var gutterX = (index, val1) => {
        return Math.trunc(
          item.frame.x + Main.gutterWidth * index + colWidth * (index + val1)
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
          gutterXList[i + 1] - gutterXList[i] - Number(Main.gutterWidth);
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
            borders: [{ thickness: 0 }]
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
}
