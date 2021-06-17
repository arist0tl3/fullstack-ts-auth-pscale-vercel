import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import AppBar from 'Components/AppBar';
import Article from 'Components/Article';
import Articles from 'Components/Articles';
import Home from 'Components/Home';
import Login from 'Components/Login';
import NewArticle from 'Components/NewArticle';
import Register from 'Components/Register';

const Container = styled.div`
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div``;

function App() {
  return (
    <Container>
      <AppBar />
      <Content>
        <Switch>
          <Route path={'/login'}>
            <Login />
          </Route>
          <Route path={'/register'}>
            <Register />
          </Route>
          <Route exact path={'/articles/new'}>
            <NewArticle />
          </Route>
          <Route path={'/articles/:articleId'}>
            <Article />
          </Route>
          <Route path={'/articles'}>
            <Articles />
          </Route>
          <Route path={'/'}>
            <Home />
          </Route>
        </Switch>
      </Content>
    </Container>
  );
}

export default App;
