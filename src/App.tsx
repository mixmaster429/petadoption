import 'styles/global.scss';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from 'pages/index';
import Adoption from 'pages/adoption';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/adoption/:id'>
            <Adoption />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
