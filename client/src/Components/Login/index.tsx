import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { User } from 'generated/graphql';
import { useHistory } from 'react-router-dom';
import { LoginInput } from 'generated/generated/graphql';

import LOGIN from 'data/Mutation/Login';

import { Container } from 'Components/_shared';

import LoginForm from './_components/LoginForm';

interface OnSubmitProps {
  email: string;
  password: string;
}

export default function Login() {
  const history = useHistory();
  const [hasError, setHasError] = useState(false);

  const [login, { data }] = useMutation<{ login: User }, { input: LoginInput }>(LOGIN, {
    onError: (e) => {
      if (e.toString() === 'Error: Bad password') {
        setHasError(() => true);
      }
    },
  });

  const onSubmit = ({ email, password }: OnSubmitProps) => {
    setHasError(() => false);
    login({ variables: { input: { email, password } } });
  };

  useEffect(() => {
    if (!data) return;

    const { login: user } = data;

    if (user.token) {
      localStorage.setItem('token', user.token);
      history.push('/articles');
    }
  }, [data]);

  return (
    <Container>
      <LoginForm hasError={hasError} onSubmit={onSubmit} />
    </Container>
  );
}
