const { game } = require("./helpers/auxiliar");
const { confirmar } = require("./helpers/inquirer");

const main = async () => {
  let playAgain = null;
  do {
    const end = await game();
    if (end) {
      playAgain = await confirmar("Play again?");
    }
  } while (playAgain);
};

main();
