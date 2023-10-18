const figlet = require('figlet')
const chalk = require('chalk')

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



module.exports = { start, end }