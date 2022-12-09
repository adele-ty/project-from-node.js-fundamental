const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`Please input a string `, (str) => {
    let output = ''
    for (let i = str.length - 1; i > -1; i--)
        output += str.charAt(i)
    console.log('output: ' + output);
    rl.close();
});