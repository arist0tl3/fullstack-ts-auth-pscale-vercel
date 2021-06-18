import { useState, FormEvent, ChangeEvent } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Form } from 'Components/_shared';

const NewCommentFormPropTypes = {
  onSubmit: PropTypes.func.isRequired,
};

type NewCommentFormProps = PropTypes.InferProps<typeof NewCommentFormPropTypes>;

export default function NewCommentForm({ onSubmit }: NewCommentFormProps) {
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!content) {
      setContentError('Some content is required');
      return;
    }

    onSubmit({ content });

    setContent(() => '');
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContentError('');
    setContent(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        id={'content'}
        error={!!contentError}
        helperText={contentError}
        label={'Your Comment'}
        onChange={handleContentChange}
        required
        value={content}
      />
      <Button variant={'contained'} color={'primary'} type={'submit'} onClick={handleSubmit}>
        {'Submit'}
      </Button>
    </Form>
  );
}
