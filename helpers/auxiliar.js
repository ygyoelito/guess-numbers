require("colors");
const { leerInput } = require("./inquirer");

const generateRandomNumber = (long = 4) => {
  const number_seed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return number_seed
    .sort(() => Math.random() - 0.5)
    .slice(0, long)
    .join("");
};

const getResponse = (secretNumber, answerNumber) => {
  answerNumber = Array.from(String(answerNumber));
  secretNumber = Array.from(String(secretNumber));

  let result = {
    good: 0,
    fair: 0,
    bad: 0,
  };

  for (let i = 0; i < answerNumber.length; i++) {
    if (!secretNumber.includes(answerNumber[i])) {
      result.bad++;
    } else if (
      secretNumber.includes(answerNumber[i]) &&
      secretNumber[i] !== answerNumber[i]
    ) {
      result.fair++;
    } else {
      result.good++;
    }
  }
  return result;
};

const formatAnswer = (input) => {
  return (
    `Good: ${input.good}`.green +
    " | " +
    `Fair: ${input.fair}`.blue +
    " | " +
    `Bad: ${input.bad}`.red
  );
};

const validateResponse = (shoot) => {
  const arr_shoot = Array.from(String(shoot)).sort();

  let results = [];
  for (let i = 0; i < arr_shoot.length - 1; i++) {
    if (arr_shoot[i + 1] === arr_shoot[i]) {
      results.push(arr_shoot[i]);
    }
  }
  return arr_shoot.length === 4 && !isNaN(shoot) && results.length === 0;
};

const game = async () => {
  const secret = generateRandomNumber(4);
  let win = false;
  let attemp = 1;

  do {
    const shoot = await leerInput("Please enter a number:");

    if (!validateResponse(shoot)) {
      console.log("Wrong input!! Your possible answers can only be 4 distinct digit numbers".bgRed);
    } else {
      const resp = getResponse(secret, shoot);
      console.log(formatAnswer(resp), "----", `Attemp #${attemp}`.cyan, "\n");
      resp.good === 4 ? (win = true) : attemp++;
    }
  } while (!win);

  if (win) {
    console.log(
      ("You win in " + attemp + " attemps guessing the number: ").rainbow +
        `${secret}`.cyan
    );
    return secret;
  }
};

module.exports = {
  game, validateResponse 
};
