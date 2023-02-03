require("colors");
const { game } = require("./helpers/auxiliar");
const { confirmar, leerInput } = require("./helpers/inquirer");

const main = async () => {
  let playAgain = null;  
  do {
    let long = await leerInput("Enter the number of digits (1 to 9) to play with:".red);

    if (parseInt(long) !== NaN && parseInt(long) >= 1 && parseInt(long) <= 9) {
        const end = await game(parseInt(long));
        if (end) {
          playAgain = await confirmar("Play again?");
        }
    } else {        
        playAgain = true;
    }   

  } while (playAgain);
};

main();
