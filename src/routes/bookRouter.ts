import {bookInterface, bookSearch} from '../interfaces/bookinterface';
import {Request, Response, Router} from 'express';
import Bookmodel from '../../models/bookmodel';

const express = require('express');

const routes = (BookModel: typeof Bookmodel) => {
  const bookRouter: Router = new express.Router();

  bookRouter.route('/books')
      .post((req:Request, res:Response) => {
        const book = new Bookmodel(req.body);

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
        BookModel.findById(req.params.bookId,
            (err: Error, book: bookInterface)=>{
              if (err) {
                return res.send(err);
              }
              res.json(book);
            });
      });

  return bookRouter;
};

export default routes;
