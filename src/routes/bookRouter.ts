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
      .get((req:bookRequest, res:Response) => res.json(req.book))
      .put((req:bookRequest, res:Response) => {
        const {book} = req;
        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;

        const modifiedBook = new BookModel(req.book);
        modifiedBook.save();

        return res.json(modifiedBook);
      })
      .patch((req:bookRequest, res:Response) => {
        const modifiedBook = new BookModel(req.book);
        if (req.body.title) {
          modifiedBook.title = req.body.title;
        }
        if (req.body.author) {
          modifiedBook.author = req.body.author;
        }
        if (req.body.genre) {
          modifiedBook.genre = req.body.genre;
        }
        if (req.body.read) {
          modifiedBook.read = req.body.read;
        }

        modifiedBook.save();
        return res.json(modifiedBook);
      })
      .delete((req:bookRequest, res:Response) => {
        const bookToDelete = new BookModel(req.book);
        bookToDelete.delete();
        return res.sendStatus(204);
      });

  return bookRouter;
};

export default routes;
