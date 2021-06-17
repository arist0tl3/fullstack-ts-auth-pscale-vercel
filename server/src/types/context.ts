import { User } from 'generated/graphql';
import Knex from 'knex';
import { Model } from 'objection';

interface Article extends Model {
}

export interface Context {
  currentUser?: User
  knex: Knex
  Article: Article
}
