import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from './login'
import Homepage from './homepage'
import Logout from './logout'
import Error404 from './error404'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/auth">
            <Login />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route path='*'>
            <Error404 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
