import { useState, ChangeEvent, FormEvent } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Form } from 'Components/_shared';

const RegisterFormPropTypes = {
  onSubmit: PropTypes.func.isRequired,
};

type RegisterFormProps = PropTypes.InferProps<typeof RegisterFormPropTypes>;

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailError('');
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError('');
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let hasErrors = false;

    if (!email) {
      setEmailError('Email is required');
      hasErrors = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasErrors = true;
    }

    if (hasErrors) return;

    onSubmit({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        id={'email'}
        error={!!emailError}
        helperText={emailError}
        label={'Your Email'}
        onChange={handleEmailChange}
        required
        value={email}
      />
      <TextField
        id={'password'}
        error={!!passwordError}
        helperText={passwordError}
        label={'Password'}
        onChange={handlePasswordChange}
        required
        type={'password'}
        value={password}
      />
      <Button variant={'contained'} color={'primary'} type={'submit'} onClick={handleSubmit}>
        {'Submit'}
      </Button>
    </Form>
  );
}
