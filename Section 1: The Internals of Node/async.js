const https = require('https');

const start = Date.now();

function makeResquest() {
    https.request('https://www.google.com', res => {
        res.on('data', () => {});

        res.on('end', () => {
            console.log(Date.now() - start);
        })
    }).end();
}

// all complete around the same time
    // libuv delegates the request making to the underlying OS
    // therefore no blocking in the js side on the event loop
makeResquest();
makeResquest();
makeResquest();
makeResquest();
makeResquest();
makeResquest();
