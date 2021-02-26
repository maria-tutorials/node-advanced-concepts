const cluster = require('cluster');

console.log(cluster.isMaster);

if (cluster.isMaster) {
    cluster.fork();
    cluster.fork();
    cluster.fork();
} else {
    const express = require('express');
    const app = express();

    const PORT = 3000;

    function work(duration) {
        const start = Date.now();
        while((Date.now() - start) < duration) { }
    }

    app.get('/', (req, res) => {
        work(5000);
        console.log('is slow');
        res.send('Hallo');
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
  // ab -c 50 -n 500 localhost:300/fast
