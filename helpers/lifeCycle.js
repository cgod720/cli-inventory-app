const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { nanoid } = require('nanoid')
const { writeJSONFile, readJSONFile } = require('../helpers/fileSystem')
const boards = readJSONFile('./data', 'skateShopInventory.json')

const start = (func) => {
    figlet(
        'Skate\n Yard',
        {
            font: "3D-ASCII",
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
        console.log(chalk.white(data))
    })
    
    setTimeout(() => {
       func()
    }, 2000)
}

const end = () => {
    figlet(
        'Later',
        {
            font: "3D-ASCII",
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 200,
            whitespaceBreak: false
        },
        (err, data) => {
            const colors = ['red', 'green', 'blue', 'magenta', 'yellow', 'cyan', 'gray', 'white']
            const colorIndex = Math.floor(Math.random() * colors.length)
            const color = colors[colorIndex]
            console.log(chalk[color](data))
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
            const newBoard = {
                id: nanoid(10),
                ...answers
            }
            for(let key in answers){
                if(answers[key] == ''){
                    console.log(`Field [${key}] cannot be empty`)
                    return
                }
            }
            boards.push(newBoard)
            writeJSONFile('./data', 'skateShopInventory.json', boards)
            func()
        })
}

const editTheBoard = (id, index, func) => {
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
            const updatedBoard = {
                id: id,
                ...answers
            }
            Object.keys(answers).forEach(key => {
                if(!answers[key]){
                    updatedBoard[key] = boards[index][key]
                }
            })

            boards.splice(index, 1, updatedBoard)
            writeJSONFile('./data', 'skateShopInventory.json', boards)
            func()
        })

}

const editBoard = (func) => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: "Enter the ID of the board you wish you edit:"
            }
        ])
        .then((answers) => {
            const id = answers['id']
            const boardToUpdateId = boards.findIndex((board) => board.id == id)
            editTheBoard(id, boardToUpdateId, func)
        })
}

const deleteBoard = (func) => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'Enter the ID of the board to delete'
            }
        ])
        .then(answers => {
            const id = answers['id']
            const boardToDeleteIndex = boards.findIndex(board => board.id === id)
            boards.splice(boardToDeleteIndex, 1)
            writeJSONFile('./data', 'skateShopInventory.json', boards)
            func()
        })
}




module.exports = { start, end, addBoard, editBoard, deleteBoard }