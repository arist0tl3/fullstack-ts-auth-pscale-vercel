import { Switch, Route } from 'react-router-dom';

import Article from 'Components/Article';
import Articles from 'Components/Articles';
import Home from 'Components/Home';
import Login from 'Components/Login';
import NewArticle from 'Components/NewArticle';
import Register from 'Components/Register';

function App() {
  return (
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
  );
}

export default App;
