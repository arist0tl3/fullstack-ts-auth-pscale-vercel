import DataLoader from 'dataloader';

import { knex } from '../../index';

const userLoader = new DataLoader((keys) => {
  const result = keys.map((userId) => {
    return knex('user').select('id', 'email').where({ id: userId }).first();
  });

  return Promise.resolve(result);
});

export default userLoader;
