import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { Mutation } from 'generated/generated/graphql';

import Button from '@material-ui/core/Button';

import LOGOUT from 'data/Mutation/Logout';

const StyledButton = styled(Button)`
  color: #ffffff;
`;

export default function LogoutButton() {
  const history = useHistory();
  const [logout, { data }] = useMutation<{ logout: Mutation['logout'] }>(LOGOUT);

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    if (data?.logout) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }, [data]);

  return <StyledButton onClick={handleClick}>{'Log Out'}</StyledButton>;
}
