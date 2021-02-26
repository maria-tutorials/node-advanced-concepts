process.env.UV_THREADPOOL_SIZE = 5;


const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();

function makeResquest() {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});

        res.on('end', () => {
            console.log(`request: ${Date.now() - start}`);
        })
    }).end();
}

function makeHash() {
    crypto.pbkdf2('password', 'banana', 100000, 512, 'sha512', () => {
        console.log(`hash: ${Date.now() - start}`);
    });
}

function readFile() {
    fs.readFile('multitask.js', 'utf8', () => {
        console.log(`fs: ${Date.now() - start}`);
    });
}


makeResquest();

readFile();

makeHash();
makeHash();
makeHash();
makeHash();


// RESULT:
    // fs comes first (has dedicated thread)
    //  then http request
    //  folowed by the slow hashes

/*
    fs: 50
    request: 288
    hash: 1199
    hash: 1201
    hash: 1203
    hash: 1204
*/
