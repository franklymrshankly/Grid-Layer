export default function(type, min, key1, key2) {
  var UI = require("sketch/ui");
  var Settings = require("sketch/settings");

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

  UI.getInputFromUser(
    type + " - Gutters on the outside?",
    {
      type: UI.INPUT_TYPE.selection,
      possibleValues: options
    },
    (err, value) => {
      if (err) {
        selectorComplete = false;
        return;
      }
      outsideGutter = value;
    }
  );

  if (selectorComplete) {
    while (colAmountIsNan) {
      UI.getInputFromUser(
        colAmountMessage,
        {
          initialValue: colAmount
        },
        (err, value) => {
          if (err) {
            colAmountComplete = false;
            inputComplete = false;
            colAmountIsNan = false;
            return;
          }
          Settings.setSettingForKey(key1, value);
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

    if (colAmountComplete) {
      while (gutterWidthIsNaN) {
        UI.getInputFromUser(
          gutterWidthMessage,
          {
            initialValue: gutterWidth
          },
          (err, value) => {
            if (err) {
              inputComplete = false;
              gutterWidthIsNaN = false;
              return;
            }
            Settings.setSettingForKey(key2, value);
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
    inputComplete
  };
}
