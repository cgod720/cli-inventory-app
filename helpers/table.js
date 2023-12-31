const Table = require('cli-table')

const createTable = (boards) => {
    const table = new Table({
        head: ["ID", 'Name', 'Brand', 'Price', 'In Stock'],
        colWidths: [13, 35, 20, 10, 10]
    })
    boards.forEach((board) => table.push(Object.values(board)))
    return table;
}

module.exports = createTable