import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Table from './components/Table'
import Store from './components/Store'
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';



const App: React.FC = () => {

  return (
    <Store>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path='/'>
            <Container maxWidth="lg">
              <Table />
            </Container>
          </Route>
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
