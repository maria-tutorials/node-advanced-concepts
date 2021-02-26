const express = require('express');
const app = express();

const { Worker } = require('worker_threads');  

const PORT = 3000;

app.get('/', (req, res) => {
    const worker = new Worker(__filename, function() {
        this.onmessage = function() {
            let counter = 0;
            while(counter < 1e9) {
                counter++;
            }

            postMessage(counter);
        }
    });

    worker.onmessage = function(message) {
        console.log(message.data);
    }

    worker.postMessage('');
});

app.get('/fast', (req, res) => {
    console.log('is fast');
    res.send('Vroom vroom');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// pm2 start index_pm2.js -i  0 

  // -i instances, if 0 => pm2 will set as many as logical cpu cores available
