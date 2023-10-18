const commands = [
    {
        type: 'list',
        name: 'command',
        message: 'What would you like to do?',
        choices: ['View Inventory', 'Add Board', 'Update Item', 'Remove Item']
    },
    {
        type: 'list',
        name: 'command',
        message: 'Would you like to do something else?',
        choices: ["Yes", "No"]
    }
]


module.exports = commands