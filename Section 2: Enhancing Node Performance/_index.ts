import express, { Request, Response} from 'express';

const app = express();
const PORT = 3000;

function work(duration:number): void {
    const start = Date.now();
    while((Date.now() - start) < duration) { }
}

app.get('/', (req: Request, res: Response) => {
    work(5000);
    res.send('Hallo');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
