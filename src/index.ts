import {Request, Response} from 'express';
import {connect} from 'mongoose';
import {urlencoded, json} from 'body-parser';
import BookModel from '../models/bookmodel';
import {bookInterface, bookSearch} from './interfaces/bookinterface';

const express = require('express');
const app = express();
const port = process.env.Port || 3000;
// eslint-disable-next-line no-unused-vars
const db = connect('mongodb://localhost/bookAPI');

app.use(urlencoded({extended: true}));
app.use(json());

const bookRouter = new express.Router();

bookRouter.route('/books')
    .post((req:Request, res:Response) => {
      const book = new BookModel(req.body);

      try {
        book.save();
        return res.json(book);
      } catch (err) {
        return res.json(err);
      }
    })
    .get((req:Request, res:Response) => {
      const myQuery: bookSearch = {};

      if (req.query.author) {
        myQuery.author = String(req.query.author);
      }
      if (req.query.genre) {
        myQuery.genre = String(req.query.genre);
      }
      if (req.query.read) {
        myQuery.read = Boolean(req.query.read);
      }

      BookModel.find(myQuery, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });

bookRouter.route('/books/:bookId')
    .get((req:Request, res:Response) => {
      BookModel.findById(req.params.bookId, (err: Error, book: bookInterface)=>{
        if (err) {
          return res.send(err);
        }
        res.json(book);
      });
    });

app.use('/api', bookRouter);

app.get('/', (req:Request, res:Response) => {
  res.send('It works!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
