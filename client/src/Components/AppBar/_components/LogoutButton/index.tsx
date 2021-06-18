import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  color: #ffffff;
`;

export default function LogoutButton() {
  const history = useHistory();

  const handleClick = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <StyledButton onClick={handleClick}>{'Log Out'}</StyledButton>
  );
}
