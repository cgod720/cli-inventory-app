const { readJSONFile } = require('./helpers/fileSystem')
const boards = readJSONFile('./data', 'skateShopInventory.json')
const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer')
const [commands, again] = require('./helpers/commands')
const createTable = require('./helpers/table')

const allFonts = () => {
    const fonts = figlet.fontsSync()
        let i = 0
        setInterval(() => {
            figlet('Hello Space', { font: fonts[i] }, (err, data) => err ? console.log(err) : console.log(`${fonts[i]}:\n`, data))
            i++
            if(i === 189) return
        }, 3000)
}

const end = () => {
    figlet(
        'See you later!',
        {
            font: "Bolger",
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 200,
            whitespaceBreak: false
        },
        (err, data) => {
            console.log(chalk.magenta(data))
        }
    )
}

const performAnotherTask = () => {
    let response;
    inquirer
        .prompt(again)
        .then(answer => {
            if(answer['command'] === "Yes"){
                run()
            } else {
                // console.log("Thanks for using Skate Yard!")
                end()
            }
        })
}

const run = () => {
    let command;
    inquirer
        .prompt(commands)
        .then(answer => {
            // console.log(answer)
            command = answer['command']
            switch(command){
                case "View Inventory":
                    // console.log(boards)
                    const printBoards = createTable(boards)
                    console.log(printBoards.toString())
                    performAnotherTask()
                    break;
                case "Add Board":
                case "Edit Board":
                case "Delete Board":
                case "Yes":
                    run()
                    break;
            }
        })
     
         
    // prompt continue || exit
}

const start = () => {
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
       run()
    }, 2000)
}

start()



