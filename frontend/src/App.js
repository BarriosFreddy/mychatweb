import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomeComponent } from './views/HomeComponent/HomeComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { LoginComponent } from './views/LoginComponent/LoginComponent';
import { RegisterComponent } from './views/RegisterComponent/RegisterComponent';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/register">
              <RegisterComponent />
            </Route>
            <Route path="/">
              {this.state.loggedIn && <HomeComponent />}
              {!this.state.loggedIn && <LoginComponent />}
            </Route>
          </Switch>
        </div>
      </Router>
    )

  }
}