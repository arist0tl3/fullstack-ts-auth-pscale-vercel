import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Article } from 'generated/generated/graphql';

import ARTICLES from 'data/Query/Articles';

interface ArticlesData {
  articles: Article[]
}

const Articles = () => {
  const { loading, error, data } = useQuery<ArticlesData>(ARTICLES);

  if (loading) return null;
  if (error) return <p>{'Error :('}</p>;

  return (
    <div>
      <div>
        {data && data.articles.map((article) => (
          <div key={article.id}>
            <Link to={`/articles/${article.id}`}>{article.title}</Link>
          </div>
        ))}
      </div>
      <Link to={'/articles/new'}>{'New Article'}</Link>
    </div>
  );
};

export default Articles;
