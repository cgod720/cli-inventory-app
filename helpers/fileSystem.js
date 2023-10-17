const { writeFileSync, readFileSync, read, readFile } = require('node:fs')

// console.log(writeFileSync, readFileSync)


const readJSONFile = (path, file) => {
    const data = readFileSync(`${path}/${file}`)
    return data ? JSON.parse(data) : []
}



module.exports = { readJSONFile }