import {Request, Response} from 'express';

const express = require('express');
const bookRouter = new express.Router();
const app = express();
const port = process.env.Port || 3000;

bookRouter.route('/books')
    .get((req:Request, res:Response) => {
      const response = {hello: 'this is my book API'};
      res.json(response);
    });

app.use('/api', bookRouter);

app.get('/', (req:Request, res:Response) => {
  res.send('It works!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
