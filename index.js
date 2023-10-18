const { readJSONFile } = require('./helpers/fileSystem')
const { start, end, addBoard } = require('./helpers/lifeCycle')
const [commands, again] = require('./helpers/commands')
const createTable = require('./helpers/table')
const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer')

const allFonts = () => {
    const fonts = figlet.fontsSync()
        let i = 0
        setInterval(() => {
            figlet('Hello Space', { font: fonts[i] }, (err, data) => err ? console.log(err) : console.log(`${fonts[i]}:\n`, data))
            i++
            if(i === 189) return
        }, 3000)
}

const performAnotherTask = () => {
    inquirer
        .prompt(again)
        .then(answer => {
            if(answer['command'] === "Yes"){
                run()
            } else {
                end()
            }
        })
}


const run = () => {
    const boards = readJSONFile('./data', 'skateShopInventory.json')
    let command;
    inquirer
        .prompt(commands)
        .then((answer) => {
            command = answer['command']
            switch(command){
                case "View Inventory":
                    const printBoards = createTable(boards)
                    console.log(printBoards.toString())
                    performAnotherTask()
                    break;
                case "Add Board":
                    addBoard(performAnotherTask)
                    break;
                case "Edit Board":
                case "Delete Board":
                case "Yes":
                    run()
                    break;
            }
        })
}



start(run)




