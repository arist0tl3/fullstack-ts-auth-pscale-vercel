import { Context as ApolloContext } from 'apollo-server-core';
import { IncomingHttpHeaders } from 'http';
import { User } from 'generated/graphql';
import Knex from 'knex';

export interface Context extends ApolloContext {
  currentUser?: User
  headers: IncomingHttpHeaders
  knex: Knex
}
