process.env.UV_THREADPOOL_SIZE = 1; // every child will only have one thread available from the pool

const cluster = require('cluster');
const crypto = require('crypto');

console.log(cluster.isMaster);

if (cluster.isMaster) {
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
    cluster.fork();
} else {
    const express = require('express');
    const app = express();

    const PORT = 3000;

    app.get('/', (req, res) => {
        crypto.pbkdf2('password', 'banana', 100000, 512, 'sha512', () => {
            res.send('Hallo');
        });
    });

    app.get('/fast', (req, res) => {
        console.log('is fast');
        res.send('Vroom vroom');
    });

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

// Benchmarking using ab command (apache benchmark), similar to artilery
  // ab -c 50 -n 500 localhost:3000/fast

  // ab -c 1 -n 1 localhost:3000/
  // ab -c 2 -n 2 localhost:3000/
  // ab -c 6 -n 6 localhost:3000/
