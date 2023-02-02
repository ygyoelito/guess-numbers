const inquirer = require('inquirer');
require('colors');

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return `${message}`.red;
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}

const confirmar = async (message) => {
    const pregunta = [{
        type: 'confirm',
        name: 'ok',
        message
    }]
    const {ok} = await inquirer.prompt(pregunta);
    return ok; 
}

module.exports = {
    leerInput,
    confirmar,
}