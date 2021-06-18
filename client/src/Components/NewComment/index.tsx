import { useMutation } from '@apollo/client';
import { CreateCommentInput, Comment } from 'generated/generated/graphql';
import PropTypes from 'prop-types';

import ARTICLE from 'data/Query/Article';
import CREATE_COMMENT from 'data/Mutation/CreateComment';

import Typography from '@material-ui/core/Typography';

import { FormWrapper } from 'Components/_shared';

import NewCommentForm from './_components/NewCommentForm';

const NewCommentPropTypes = {
  articleId: PropTypes.string.isRequired,
};

type NewCommentProps = PropTypes.InferProps<typeof NewCommentPropTypes>;

interface OnSubmitProps {
  content: string
}

export default function NewComment({ articleId }: NewCommentProps) {
  const [createComment] = useMutation<{ createComment: Comment }, { input: CreateCommentInput }>(CREATE_COMMENT);

  const onSubmit = ({ content }: OnSubmitProps) => {
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
  };

  return (
    <>
      <Typography variant={'h6'}>{'Leave a comment'}</Typography>
      <FormWrapper>
        <NewCommentForm onSubmit={onSubmit} />
      </FormWrapper>
    </>
  );
}

NewComment.propTypes = NewCommentPropTypes;
