require("colors");
const { leerInput} = require("./inquirer");

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

const game = async () => {
    const secret = generateRandomNumber(4);
    let win = false;
    let attemp = 1;
  
    do {
      const shoot = await leerInput("Please enter a number:");

      if (shoot.length !== 4 || isNaN(shoot)) {
        console.log('Wrong input!!'.bgRed);
      } else {
        const resp = getResponse(secret, shoot);
        console.log(formatAnswer(resp), '----', `Attemp #${attemp}`.cyan, '\n');
        resp.good === 4 ? win = true : attemp++;  
      }
    } while (!win);
  
    if (win) {   
      console.log(('You win in ' + attemp + ' attemps guessing the number: ').rainbow + `${secret}`.cyan);
      return secret;
    }
}

module.exports = {
  game
};
