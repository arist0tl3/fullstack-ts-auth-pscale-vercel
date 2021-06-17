import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { CreateArticleInput, Article } from 'generated/generated/graphql';

import ARTICLES from 'data/Query/Articles';
import CREATE_ARTICLE from 'data/Mutation/CreateArticle';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { Form, FormWrapper } from 'Components/_shared';

export default function NewArticle() {
  const history = useHistory();

  const [createArticle, { data }] =
    useMutation<{ createArticle: Article }, { input: CreateArticleInput }>(CREATE_ARTICLE);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let hasErrors = false;

    if (!title) {
      hasErrors = true;
      setTitleError('Title is required');
    }

    if (!content) {
      hasErrors = true;
      setContentError('Content is required');
    }

    if (hasErrors) return;

    createArticle({
      refetchQueries: [
        {
          query: ARTICLES,
          variables: {
            input: {
              orderBy: 'createdAt',
              orderDirection: 'DESC',
            },
          },
        },
      ],
      variables: { input: { title, content } },
    });
  };

  useEffect(() => {
    if (!data) return;

    const { createArticle: article } = data;

    if (article.id) history.push('/articles');
  }, [data]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleError('');
    setTitle(e.target.value);
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContentError('');
    setContent(e.target.value);
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit}>
        <Typography variant={'h3'}>{'New Article'}</Typography>
        <TextField
          id={'title'}
          error={!!titleError}
          helperText={titleError}
          label={'Title'}
          onChange={handleTitleChange}
          required
          value={title}
        />
        <TextField
          id={'content'}
          error={!!contentError}
          helperText={contentError}
          label={'Content'}
          multiline
          onChange={handleContentChange}
          required
          rows={4}
          value={content}
        />
        <Button variant={'contained'} color={'primary'} type={'submit'} onClick={handleSubmit}>
          {'Submit'}
        </Button>
      </Form>
    </FormWrapper>
  );
}
