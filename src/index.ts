import {Request, Response} from 'express';
import {connect} from 'mongoose';
import {urlencoded, json} from 'body-parser';
import Book from '../models/bookmodel';

const express = require('express');
const app = express();
const port = process.env.Port || 3000;
// eslint-disable-next-line no-unused-vars
const db = connect('mongodb://localhost/bookAPI');

app.use(urlencoded({extended: true}));
app.use(json());

const bookRouter = new express.Router();

bookRouter.route('/books')
    .get((req:Request, res:Response) => {
      const response = {hello: 'this is my book API'};
      res.json(response);
    })
    .post((req:Request, res:Response) => {
      const book = new Book(req.body);

      console.log(book);
      return res.json(book);
    });

app.use('/api', bookRouter);

app.get('/', (req:Request, res:Response) => {
  res.send('It works!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
