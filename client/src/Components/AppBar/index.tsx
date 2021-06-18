import styled from 'styled-components';

import MuiAppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import LogoutButton from './_components/LogoutButton';

const StyledAppBar = styled(MuiAppBar)`
  background: green;
  height: 64px;
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default function AppBar() {
  return (
    <StyledAppBar position={'fixed'}>
      <Typography variant={'h6'}>
        {'My App'}
      </Typography>
      <LogoutButton />
    </StyledAppBar>
  );
}
