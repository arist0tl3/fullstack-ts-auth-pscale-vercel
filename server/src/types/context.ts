import { Connection } from 'mysql2/promise';

export interface Context {
  db: Connection;
}
