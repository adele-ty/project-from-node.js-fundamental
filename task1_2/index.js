const fs = require('fs')
const csv = require('csvtojson')

const csvFilePath = __dirname + '/csv/csv.txt'


const readStream = fs.createReadStream(csvFilePath);

const writeStream = fs.createWriteStream(__dirname + '/csv/newTxt.json')

readStream.pipe(csv()).pipe(writeStream);
