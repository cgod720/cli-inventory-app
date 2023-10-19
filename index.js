const { readJSONFile } = require('./helpers/fileSystem')
const { start, end, addBoard, editBoard, deleteBoard } = require('./helpers/lifeCycle')
const [commands, again] = require('./helpers/commands')
const createTable = require('./helpers/table')
const figlet = require('figlet')
const inquirer = require('inquirer')
const { startLoadingAnimation, spinnerDelay } = require('./helpers/spinner')

const allFonts = () => {
    const fonts = figlet.fontsSync()
        let i = 0
        setInterval(() => {
            figlet('Later', { font: fonts[i] }, (err, data) => err ? console.log(err) : console.log(`${fonts[i]}:\n`, data))
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
            const stopLoadingAnimation = startLoadingAnimation()
            switch(command){
                case "View Inventory":
                    const printBoards = createTable(boards)
                    setTimeout(() => {
                        stopLoadingAnimation()
                        console.log(printBoards.toString())
                    performAnotherTask()
                    }, 1200)
                    break;
                case "Add Board":
                    spinnerDelay(stopLoadingAnimation, addBoard, performAnotherTask)
                    break;
                case "Edit Board":
                    spinnerDelay(stopLoadingAnimation, editBoard, performAnotherTask)
                    break;
                case "Delete Board":
                    spinnerDelay(stopLoadingAnimation, deleteBoard, performAnotherTask)
                    break;
            }
        })
}



start(run)




