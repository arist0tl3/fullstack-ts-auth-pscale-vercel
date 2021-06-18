import { useQuery } from '@apollo/client';
import { Article } from 'generated/generated/graphql';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import ARTICLE from 'data/Query/Article';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import NewComment from 'Components/NewComment';

interface ArticleData {
  article: Article;
}

const ArticleWrapper = styled(Container)`
  width: 100%;
  max-width: 600px;
`;

const CommentsWrapper = styled.div`
  margin-top: 32px;
`;

export default function Articles() {
  const { articleId } = useParams<{ articleId: string }>();

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
    <ArticleWrapper>
      <Typography variant={'h2'}>{article.title}</Typography>
      <Typography variant={'body1'}>{article.content}</Typography>
      <div>
        <CommentsWrapper>
          <Typography variant={'h5'}>{'Comments'}</Typography>
          {article.comments &&
            article.comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.content}</p>
              </div>
            ))}
          <NewComment articleId={articleId} />
        </CommentsWrapper>
      </div>
    </ArticleWrapper>
  );
}
