import { useQuery } from '@apollo/client';
import { Article } from 'generated/generated/graphql';
import Grid from '@material-ui/core/Grid';

import ARTICLES from 'data/Query/Articles';

import { UnstyledLink } from 'Components/_shared';

import ArticleCard from './_components/ArticleCard';

interface ArticlesData {
  articles: Article[];
}

export default function Articles() {
  const { loading, error, data } = useQuery<ArticlesData>(ARTICLES, {
    variables: {
      input: {
        orderBy: 'createdAt',
        orderDirection: 'DESC',
      },
    },
  });

  if (loading) return null;
  if (error) return <p>{'Error :('}</p>;

  return (
    <div>
      <Grid spacing={2} container justify={'flex-start'} alignItems={'stretch'}>
        {data &&
          data.articles.map((article) => (
            <Grid item key={article.id} xs={12} sm={6} md={4} lg={3}>
              <UnstyledLink to={`/articles/${article.id}`}>
                <ArticleCard title={article.title} content={article.content} />
              </UnstyledLink>
            </Grid>
          ))}
      </Grid>
      <UnstyledLink to={'/articles/new'}>{'New Article'}</UnstyledLink>
    </div>
  );
}
