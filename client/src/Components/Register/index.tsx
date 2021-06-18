import { useMutation } from '@apollo/client';
import { User } from 'generated/graphql';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CreateUserInput } from 'generated/generated/graphql';

import CREATE_USER from 'data/Mutation/CreateUser';

import { Container } from 'Components/_shared';

import RegisterForm from './_components/RegisterForm';

interface OnSubmitProps {
  email: string
  password: string
}

export default function Register() {
  const history = useHistory();
  const [createUser, { data }] = useMutation<{ createUser: User }, { input: CreateUserInput }>(CREATE_USER);

  const onSubmit = ({ email, password }: OnSubmitProps) => {
    createUser({ variables: { input: { email, password } } });
  };

  useEffect(() => {
    if (!data) return;

    const { createUser: user } = data;

    if (user.token) {
      localStorage.setItem('token', user.token);
      history.push('/articles');
    }
  }, [data]);

  return (
    <Container>
      <RegisterForm onSubmit={onSubmit} />
    </Container>
  );
}
