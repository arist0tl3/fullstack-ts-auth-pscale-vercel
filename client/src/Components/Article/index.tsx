import { useQuery } from '@apollo/client';
import { Article } from 'generated/generated/graphql';
import { useParams } from 'react-router-dom';

import ARTICLE from 'data/Query/Article';

interface ArticleData {
  article: Article
}

const Articles = () => {
  const { articleId } = useParams<{articleId?: string}>();

  const { loading, error, data } = useQuery<ArticleData>(ARTICLE, {
    variables: {
      input: {
        articleId,
      },
    },
  });

  if (loading) return null;
  if (error) return <p>{'Error :('}</p>;
  if (!data) return null;

  const { article } = data;

  return (
    <div>
      <div>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
        <div>
          <h2>{'Comments'}</h2>
        </div>
      </div>
    </div>
  );
};

export default Articles;
