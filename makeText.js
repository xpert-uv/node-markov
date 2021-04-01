/** Command-line tool to generate Markov text. */
const Markov = require('./markov');
const process = require('process');
const fs = require('fs');
const axios = require("axios");



function generateText(text) {
    let mm = new Markov.MarkovMachine(text);
    console.log(mm);
}


function makeText(path) {
    fs.readFile(path, "utf8", function cb(err, data) {
        if (err) {
            console.error(`Cannot read file: ${path}:${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

async function urlText(url) {
    let resp;
    try {
        resp = await axios.get(url);
    }
    catch (err) {
        console.error(`Cannot read URL`)
        process.exit(1)
    }
    generateText(resp.data)
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
    console.log(` Generating text From :${path}.................`
    )
    makeText(path);
}

else if (method === "url") {
    urlText(path);
}

else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}