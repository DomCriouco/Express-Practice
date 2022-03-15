import {
  bookInterface,
  bookRequest,
  bookSearch
} from '../interfaces/bookinterface';
import {Request, Response, Router} from 'express';
import BookModel from '../../models/bookmodel';

const express = require('express');

const routes = (bookModel: typeof BookModel) => {
  const bookRouter: Router = new express.Router();

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

        bookModel.find(myQuery, (err, books) => {
          if (err) {
            return res.send(err);
          }
          return res.json(books);
        });
      });

  bookRouter.use('/books/:bookId', (req:bookRequest, res:Response, next) => {
    bookModel.findById(req.params.bookId,
        (err: Error, book: bookInterface)=>{
          if (err) {
            return res.send(err);
          }

          if (book) {
            req.book = book;
            return next();
          }

          return res.sendStatus(404);
        });
  });

  bookRouter.route('/books/:bookId')
      .get((req:bookRequest, res:Response) => {
        res.json(req.book);
      })
      .put((req:bookRequest, res:Response) => {
        req.book.title = req.body.title;
        req.book.author = req.body.author;
        req.book.genre = req.body.genre;
        req.book.read = req.body.read;

        const modifiedBook = new BookModel(req.book);
        modifiedBook.save();

        return res.json(modifiedBook);
      });

  return bookRouter;
};

export default routes;
