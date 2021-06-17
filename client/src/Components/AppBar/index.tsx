import MuiAppBar from '@material-ui/core/AppBar';
import styled from 'styled-components';

const StyledAppBar = styled(MuiAppBar)`
  background: green;
  height: 64px;
`;

export default function AppBar() {
  return <StyledAppBar position={'fixed'} />;
}
