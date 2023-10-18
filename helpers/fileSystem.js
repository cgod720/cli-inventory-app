const { writeFileSync, readFileSync } = require('node:fs')

// console.log(writeFileSync, readFileSync)


const readJSONFile = (path, file) => {
    const data = readFileSync(`${path}/${file}`)
    return data ? JSON.parse(data) : []
}

const writeJSONFile = (path, file, data) => {
    data = JSON.stringify(data, null, 2)
    writeFileSync(`${path}/${file}`, data)
}



module.exports = { readJSONFile, writeJSONFile }