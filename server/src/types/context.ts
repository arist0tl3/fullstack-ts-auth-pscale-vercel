import { User } from 'generated/graphql';
import { Knex } from 'knex';

export interface Context {
  currentUser?: User
  knex: Knex
}
