import { User } from 'generated/graphql';
import { DB } from 'types/db';
import { Knex } from 'knex';

export interface Context {
  db: DB
  currentUser?: User
  knex: Knex
}
