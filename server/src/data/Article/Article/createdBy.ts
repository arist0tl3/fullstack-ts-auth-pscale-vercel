import { Article, User } from 'generated/graphql';

import userLoader from 'data/_dataLoaders/userLoader';

const createdBy = async (root: Article): Promise<User | null> => {
  if (!root.createdById) return null;

  return userLoader.load(root.createdById);
};

export default createdBy;
