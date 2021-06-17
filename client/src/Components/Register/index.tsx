import { useMutation } from '@apollo/client';
import { User } from 'generated/graphql';
import { useState, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CreateUserInput } from 'generated/generated/graphql';

import CREATE_USER from 'data/Mutation/CreateUser';

import { Form, FormField, Container } from 'Components/_shared';

export default function Register() {
  const history = useHistory();
  const [createUser, { data }] = useMutation<{ createUser: User }, { input: CreateUserInput }>(CREATE_USER);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // eslint-disable-next-line no-alert
    if (!email || !password) return window.alert('Please enter an email and password!');

    createUser({ variables: { input: { email, password } } });

    return false;
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
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor={'email'}>{'Email'}</label>
          <input id={'email'} type={'email'} value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        </FormField>
        <FormField>
          <label htmlFor={'password'}>{'Password'}</label>
          <input
            id={'password'}
            type={'password'}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </FormField>
        <button type={'submit'} onClick={handleSubmit}>
          {'Submit'}
        </button>
      </Form>
    </Container>
  );
}
