
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

// pm2 start index_pm2.js -i  0 

  // -i instances, if 0 => pm2 will set as many as logical cpu cores available
