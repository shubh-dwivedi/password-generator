import { alphabetSmall, alphabetsCapital, specialCharacters } from "../assets/passwordContents";

var randomPasswordArray = [];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function passwordGenerator(passKey, passwordLength, actualLength) {
  var passLengthDifference = passwordLength - randomPasswordArray.length;

  switch (passKey) {
    case 1:
        var randomNumberLength = getRandomNumber(1, actualLength);
        if (actualLength === 0 && passwordLength - randomPasswordArray.length === 2) {
            randomNumberGenerator(1);
        } else {
            randomNumberGenerator(randomNumberLength, actualLength);
        }
        break;
    case 2:
        var randomNumberLength = getRandomNumber(1, passLengthDifference - 2);
        randomSpecialCharacterGenerator(randomNumberLength);
        break;
    case 3:
        var randomCapitalAlphabetLength = getRandomNumber(1, passLengthDifference - 1);
        if (actualLength === 0 && passwordLength - randomPasswordArray.length === 3) {
            randomCapitalAlphabetGenerator(1);
        } else {
            randomCapitalAlphabetGenerator(randomCapitalAlphabetLength, actualLength);
        }
        break;
    case 4:
        if (passLengthDifference > 1) {
            randomSmallAlphabetGenerator(passLengthDifference, actualLength);
        } else {
            randomSmallAlphabetGenerator(1);
        }
        break;

    default:
        break;
  }
}

function randomSmallAlphabetGenerator(rsl, actualLength) {
  for (var i = 0; i < rsl; i++) {
    var randomSmallAlphabet = alphabetSmall[getRandomNumber(0, 25)];
    randomPasswordArray.push(randomSmallAlphabet);
    if (actualLength > 0) {
      actualLength = actualLength - 1;
    }
  }
}

function randomCapitalAlphabetGenerator(rcl, actualLength) {
  for (var i = 0; i < rcl; i++) {
    var randomCapAlphabet = alphabetsCapital[getRandomNumber(0, 25)];
    randomPasswordArray.push(randomCapAlphabet);
    if (actualLength > 0) {
      actualLength = actualLength - 1;
    }
  }
}

function randomNumberGenerator(rnm, actualLength) {
  for (var i = 0; i < rnm; i++) {
    var randomNumber = getRandomNumber(0, 9);
    randomPasswordArray.push(randomNumber);
    if (actualLength > 0) {
      actualLength = actualLength - 1;
    }
  }
}

function randomSpecialCharacterGenerator(rsc) {
  for (var i = 0; i < rsc; i++) {
    var randomSpecialChar = specialCharacters[getRandomNumber(0, 9)];
    randomPasswordArray.push(randomSpecialChar);
  }
}

function createPassword(randomLength, actualLength, numberAllowed, charAllowed) {
  for (var i = 1; i <= 4; i++) {
    if(i == 1 || i == 2) {
        if(i === 1 && numberAllowed) passwordGenerator(i, randomLength, actualLength);
        if(i === 2 && charAllowed) passwordGenerator(i, randomLength, actualLength);
    } else {
        passwordGenerator(i, randomLength, actualLength);
    }
  }

  var passwordFinalArr = [];
  for (var i = 0; i < randomLength; i++) {
    var indexNow = getRandomNumber(0, randomPasswordArray.length - 1);
    passwordFinalArr[i] = randomPasswordArray[indexNow];
    randomPasswordArray.splice(indexNow, 1);
  }

  var newPassword = passwordFinalArr.join("");
  return newPassword
}

export default function generatePassword(passLength, numberAllowed, charAllowed) {
  var actualLength = passLength - 3;
  var generatedPassword = createPassword(passLength, actualLength, numberAllowed, charAllowed);
  return generatedPassword;
}
