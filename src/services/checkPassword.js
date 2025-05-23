import { alphabetSmall, alphabetsCapital, specialCharacters, numbersArray } from "../assets/passwordContents";

function checkElementsCount(passwordString) {
  var numOfCapitalAlphabets = 0;
  var numOfSmallAlphabets = 0;
  var numOfDigits = 0;
  var numOfSymbols = 0;

  for (let element of passwordString) {
    if (alphabetsCapital.indexOf(element) !== -1) {
      numOfCapitalAlphabets++;
    } else if (alphabetSmall.indexOf(element) !== -1) {
      numOfSmallAlphabets++;
    } else if (specialCharacters.indexOf(element) !== -1) {
      numOfSymbols++;
    } else if (numbersArray.indexOf(element) !== -1) {
      numOfDigits++;
    }
  }
  return [
    numOfCapitalAlphabets,
    numOfSmallAlphabets,
    numOfDigits,
    numOfSymbols
  ];
}

export default function checkPassword(arr) {
  const stringToCheck = arr;
  var checkCounter = 0;

  if (stringToCheck.length >= 8 && stringToCheck.length <= 15) {
    var checkedCount = checkElementsCount(stringToCheck);
    for (let i of checkedCount) {
      if (i >= 1) {
        checkCounter++;
      }
    }
    if (checkCounter === 4) {
      return true;
    } else {
      return false;
    }
  }
}
