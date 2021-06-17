import { useQuery } from '@apollo/client';
import { Article } from 'generated/generated/graphql';

import ARTICLES from 'data/Query/Articles';

import { UnstyledLink } from 'Components/_shared';

import ArticleCard from './_components/ArticleCard';

interface ArticlesData {
  articles: Article[];
}

export default function Articles() {
  const { loading, error, data } = useQuery<ArticlesData>(ARTICLES);

  if (loading) return null;
  if (error) return <p>{'Error :('}</p>;

  return (
    <div>
      <div>
        {data &&
          data.articles.map((article) => (
            <UnstyledLink key={article.id} to={`/articles/${article.id}`}>
              <ArticleCard
                title={article.title}
                content={article.content}
              />
            </UnstyledLink>
          ))}
      </div>
      <UnstyledLink to={'/articles/new'}>{'New Article'}</UnstyledLink>
    </div>
  );
}
