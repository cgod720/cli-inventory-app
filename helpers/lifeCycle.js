const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { nanoid } = require('nanoid')
const { writeJSONFile, readJSONFile } = require('../helpers/fileSystem')
const boards = readJSONFile('./data', 'skateShopInventory.json')

const start = (func) => {
    figlet(
        'Skate Yard',
        {
            font: "Bolger",
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 200,
            whitespaceBreak: false
        },
        (err, data) => {
        if(err){
            console.log('Error')
            return
        }
        console.log(chalk.red(data))
    })
    
    setTimeout(() => {
       func()
    }, 2000)
}


const end = () => {
    figlet(
        'See you later!',
        {
            font: "Bolger",
            horizontalLayout: 'controlled smushing',
            verticalLayout: 'default',
            width: 200,
            whitespaceBreak: false
        },
        (err, data) => {
            console.log(chalk.green(data))
        }
    )
}

const addBoard = (func) => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: "Enter a board name:"
            },
            {
                type: 'input',
                name: 'brand',
                message: "Enter the board's brand:"
            },
            {
                type: 'input',
                name: 'priceInCents',
                message: "Enter a board's price:"
            },
            {
                type: 'input',
                name: 'inStock',
                message: "Is it in stock? [true, false]"
            },

        ])
        .then((answers) => {
            console.log(answers)
            const newBoard = {
                id: nanoid(10),
                ...answers
            }
            console.log(newBoard)
            boards.push(newBoard)
            writeJSONFile('./data', 'skateShopInventory.json', boards)
            func()
        })
        // return responses
}


module.exports = { start, end, addBoard }