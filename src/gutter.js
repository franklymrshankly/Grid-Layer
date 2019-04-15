import sketch from "sketch";
import main from "./main";

export default function() {
  var Shape = require("sketch/dom").Shape;
  var UI = require("sketch/ui");
  var document = sketch.getSelectedDocument();
  var Group = require("sketch/dom").Group;
  var selectedLayers = document.selectedLayers;
  var Main = main("GUTTERS", 0);

  var createGrid = (num, val) => {
    selectedLayers.forEach(item => {
      var gutterAmount = parseInt(Main.colAmount) + num;

      var colWidth =
        (item.frame.width - gutterAmount * Main.gutterWidth) / Main.colAmount;

      var gutterX = (index, val1) => {
        return Math.trunc(
          item.frame.x + Main.gutterWidth * index + colWidth * (index + val1)
        );
      };
      var totalWidth = Main.gutterWidth * gutterAmount;

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
              width: Main.gutterWidth,
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

  if (Main.outsideGutter === "Yes") {
    createGrid(1, 0);
  }

  if (Main.outsideGutter === "No") {
    createGrid(-1, 1);
  }
}
