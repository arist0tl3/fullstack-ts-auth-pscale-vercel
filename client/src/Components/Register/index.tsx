import { gql, useMutation } from '@apollo/client';
import { useState, FormEvent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form``;

const FormField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 4px;
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      token
    }
  }
`;

const Register = () => {
  const [createUser, { data }] = useMutation(CREATE_USER);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) return window.alert('Please enter an email and password!');

    createUser({ variables: { input: { email, password } } });

    console.log('d', data);

    return false;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor={'email'}>{'Email'}</label>
          <input id={'email'} type={'email'} value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        </FormField>
        <FormField>
          <label htmlFor={'password'}>{'Password'}</label>
          <input id={'password'} type={'password'} value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
        </FormField>
        <button type={'submit'} onClick={handleSubmit}>{'Submit'}</button>
      </Form>
    </Container>
  );
};

export default Register;
