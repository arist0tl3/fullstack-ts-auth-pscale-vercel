import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useState, FormEvent, useEffect } from 'react';
import { CreateArticleInput, Article } from 'generated/generated/graphql';

import ARTICLES from 'data/Query/Articles';
import CREATE_ARTICLE from 'data/Mutation/CreateArticle';

import { Form, FormField, Container } from 'Components/_shared';

const NewArticle = () => {
  const history = useHistory();

  const [createArticle, { data }] =
    useMutation<{ createArticle: Article }, { input: CreateArticleInput }>(CREATE_ARTICLE);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // eslint-disable-next-line no-alert
    if (!title || !content) return window.alert('Please enter a title and content!');

    createArticle({
      refetchQueries: [{
        query: ARTICLES,
      }],
      variables: { input: { title, content } },
    });

    return false;
  };

  useEffect(() => {
    if (!data) return;

    const { createArticle: article } = data;

    if (article.id) history.push('/articles');
  }, [data]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor={'title'}>{'Title'}</label>
          <input id={'title'} type={'text'} value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        </FormField>
        <FormField>
          <label htmlFor={'content'}>{'Content'}</label>
          <textarea id={'content'} value={content} onChange={(e) => setContent(e.currentTarget.value)} />
        </FormField>
        <button type={'submit'} onClick={handleSubmit}>
          {'Submit'}
        </button>
      </Form>
    </Container>
  );
};

export default NewArticle;
