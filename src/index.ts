import {Request, Response} from 'express';

const express = require('express');
const app = express();
const port = process.env.Port || 3000;

app.get('/', (req:Request, res:Response) => {
    res.send('It works!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});