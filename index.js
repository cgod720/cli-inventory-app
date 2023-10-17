const { readJSONFile } = require('./helpers/fileSystem')
const boards = readJSONFile('./data', 'skateShopInventory.json')
const figlet = require('figlet')
const chalk = require('chalk')


const start = () => {
    figlet(
        'Skate Yard',
        {
            font: "Bolger",
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 200,
            whitespaceBreak: true
        },
        (err, data) => {
        if(err){
            console.log('Error')
            return
        }
        console.log(chalk.red(data))
    })
}


// console.log()
start()
// 

const allFonts = () => {
    const fonts = figlet.fontsSync()
        let i = 0
        setInterval(() => {
            figlet('Hello Space', { font: fonts[i] }, (err, data) => err ? console.log(err) : console.log(`${fonts[i]}:\n`, data))
            i++
            if(i === 189) return
        }, 3000)
}


