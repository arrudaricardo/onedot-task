import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Table from './components/Table'
import Store from './components/Store'



const App: React.FC = () => {

  return (
    <Store>
      <Router>
        <Switch>
          <Route path='/'>
            <Table />
          </Route>
        </Switch>
      </Router>
     </Store>
  );
}

export default App;
