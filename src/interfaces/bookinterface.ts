import {Request} from 'express';

export interface bookSearch {
  author?: string,
  genre?: string,
  read?: boolean
}

export interface bookInterface {
  _id: string,
  title: string,
  author: string,
  genre: string,
  read: boolean
}

export interface bookRequest extends Request {
  book?: bookInterface,
}
