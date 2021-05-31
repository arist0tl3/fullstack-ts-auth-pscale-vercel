import { User } from 'generated/graphql';
import { DB } from 'types/db';

export interface Context {
  db: DB
  currentUser?: User
}
