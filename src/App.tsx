import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'styles/global.scss';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from 'pages/index';
import Adoption from 'pages/adoption';

function App(): JSX.Element {
  return (
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
  );
}

export default App;
