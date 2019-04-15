import sketch from "sketch";

export default function(type, min) {
  var document = sketch.getSelectedDocument();
  var selectedLayers = document.selectedLayers;
  var selectedCount = selectedLayers.length;
  var UI = require("sketch/ui");
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

  UI.getInputFromUser(
    type + " - Gutters on the outside?",
    {
      type: UI.INPUT_TYPE.selection,
      possibleValues: options
    },
    (err, value) => {
      if (err) {
        complete = false;
        return;
      }
      outsideGutter = value;
    }
  );

  if (complete === true) {
    while (colAmountIsNan) {
      UI.getInputFromUser(
        colAmountMessage,
        {
          initialValue: colAmount
        },
        (err, value) => {
          if (err) {
            complete = false;
            colAmountIsNan = false;
            colAmount = 12;
            return;
          }
          colAmount = value;
          colAmountMessage = "Column amount - is not a number";
        }
      );

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
        UI.getInputFromUser(
          gutterWidthMessage,
          {
            initialValue: gutterWidth
          },
          (err, value) => {
            if (err) {
              complete = false;
              gutterWidthIsNaN = false;
              gutterWidth = 12;
              return;
            }
            gutterWidth = value;
            gutterWidthMessage = "Gutter width - is not a number";
          }
        );

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
    outsideGutter,
    colAmount,
    gutterWidth,
    complete
  };
}
