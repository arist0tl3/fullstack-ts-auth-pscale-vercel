import { Connection } from 'mysql';

export interface Context {
  db: Connection;
}
