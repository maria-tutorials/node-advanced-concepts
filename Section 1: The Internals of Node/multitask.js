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
    // http request is always first (outside the thread pool)
    //  then either 1 or 2 hash results
    //  folowed by fs
    //  final 2 or 3 hash

/*
    request: 301
    hash: 1333
    hash: 1336
    fs: 1336
    hash: 1337
    hash: 1361
*/
/*
    request: 298
    hash: 1308
    fs: 1309
    hash: 1317
    hash: 1319
    hash: 1323
*/
