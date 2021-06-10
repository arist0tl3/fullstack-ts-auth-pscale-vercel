import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CURRENT_USER from 'data/Query/CurrentUser';

import { CurrentUser } from 'generated/graphql';

const Container = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Links = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin: 0 4px;
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(CURRENT_USER);

  if (loading) return null;
  if (error) return <p>{'Error :('}</p>;

  const { currentUser }: { currentUser: CurrentUser } = data;

  if (currentUser) {
    return <Redirect to={'/articles'} />;
  }

  return (
    <Container>
      <Links>
        <Link to={'/register'}>{'Register'}</Link>
        <span>{' | '}</span>
        <Link to={'/login'}>{'Log In'}</Link>
      </Links>
    </Container>
  );
};

export default Home;
