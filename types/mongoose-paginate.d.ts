import type { PaginateModel } from 'mongoose';
import type { IUsuario } from '../src/models/Usuario.js';

declare module 'mongoose' {
  interface PaginateModel<T> extends Model<T> {
    paginate(query?: any, options?: any, callback?: any): any;
  }
}
