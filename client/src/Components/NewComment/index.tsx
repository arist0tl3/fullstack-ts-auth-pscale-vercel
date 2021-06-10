import { useMutation } from '@apollo/client';
import { useState, FormEvent } from 'react';
import { CreateCommentInput, Comment } from 'generated/generated/graphql';
import PropTypes from 'prop-types';

import ARTICLE from 'data/Query/Article';
import CREATE_COMMENT from 'data/Mutation/CreateComment';

import { Form, FormField, Container } from 'Components/_shared';

const NewComment = ({ articleId } : { articleId: string }) => {
  const [createComment] =
    useMutation<{ createComment: Comment }, { input: CreateCommentInput }>(CREATE_COMMENT);

  const [content, setContent] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // eslint-disable-next-line no-alert
    if (!content) return window.alert('Please enter a comment!');

    createComment({
      refetchQueries: [{
        query: ARTICLE,
        variables: {
          input: {
            articleId,
          },
        },
      }],
      variables: { input: { articleId, content } },
    });

    setContent(() => '');

    return false;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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

NewComment.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default NewComment;
