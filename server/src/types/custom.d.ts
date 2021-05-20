import { Context } from './context';

declare module 'express-serve-static-core' {
  export interface Request {
    ctx: Context;
  }
}

export {};
