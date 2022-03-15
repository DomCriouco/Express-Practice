import {Request, Response} from 'express';
import {connect} from 'mongoose';
import {urlencoded, json} from 'body-parser';
import bookRouter from './routes/bookRouter';
import BookModel from '../models/bookmodel';


const express = require('express');
const app = express();
const port = process.env.Port || 3000;
// eslint-disable-next-line no-unused-vars
const db = connect('mongodb://localhost/bookAPI');

app.use(urlencoded({extended: true}));
app.use(json());

app.use('/api', bookRouter(BookModel));

app.get('/', (req:Request, res:Response) => {
  res.send('It works!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
