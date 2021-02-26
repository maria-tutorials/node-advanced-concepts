const express = require('express');
const app = express();

const PORT = 3000;

function work(duration) {
    const start = Date.now();
    while((Date.now() - start) < duration) { }
}

app.get('/', (req, res) => {
    work(5000);
    res.send('Hallo');
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
