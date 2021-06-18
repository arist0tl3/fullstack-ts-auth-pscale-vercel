import { useMutation } from '@apollo/client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { CreateCommentInput, Comment } from 'generated/generated/graphql';
import PropTypes from 'prop-types';

import ARTICLE from 'data/Query/Article';
import CREATE_COMMENT from 'data/Mutation/CreateComment';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { Form, FormWrapper } from 'Components/_shared';

const NewCommentPropTypes = {
  articleId: PropTypes.string.isRequired,
};

type NewCommentProps = PropTypes.InferProps<typeof NewCommentPropTypes>;

export default function NewComment({ articleId }: NewCommentProps) {
  const [createComment] = useMutation<{ createComment: Comment }, { input: CreateCommentInput }>(CREATE_COMMENT);

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!content) {
      setContentError('Some content is required');
      return;
    }

    createComment({
      refetchQueries: [
        {
          query: ARTICLE,
          variables: {
            input: {
              articleId,
            },
          },
        },
      ],
      variables: { input: { articleId, content } },
    });

    setContent(() => '');
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContentError('');
    setContent(e.target.value);
  };

  return (
    <>
      <Typography variant={'h6'}>{'Leave a comment'}</Typography>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
        <TextField
          id={'content'}
          error={!!contentError}
          helperText={contentError}
          label={'Your Comment'}
          multiline
          onChange={handleContentChange}
          required
          rows={1}
          value={content}
        />
        <Button variant={'contained'} color={'primary'} type={'submit'} onClick={handleSubmit}>
          {'Submit'}
        </Button>
        </Form>
      </FormWrapper>
    </>
  );
}

NewComment.propTypes = NewCommentPropTypes;
