const fs = require('fs')
const csv = require('csvtojson')

const csvFilePath = __dirname + '/csv/csv.txt'
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        fs.writeFile(__dirname + '/csv/newTxt.json', JSON.stringify(jsonObj), (err) => {
            if (err) console.log('write file failed!' + err)
            console.log('write file success!')
        })
    })