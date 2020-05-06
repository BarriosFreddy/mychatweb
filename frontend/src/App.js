import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HomeComponent } from './views/HomeComponent/HomeComponent';
import {
  Router,
  /* BrowserRouter as Router, */
  Redirect,
  Switch,
  Route
} from "react-router-dom";
import history from './history';
import { LoginComponent } from './views/LoginComponent/LoginComponent';
import { RegisterComponent } from './views/RegisterComponent/RegisterComponent';
import Constants from './constants/Constants';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loggedIn: false
    }
  }

  isLoggedIn() {
    return !!localStorage.getItem(Constants.USER_TOKEN);
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route path="/register"
              render={({ location }) =>
                !this.isLoggedIn() ? (
                  <RegisterComponent />
                ) : (
                    <Redirect
                      to={{
                        pathname: "/",
                        state: { from: location }
                      }}
                    />
                  )
              } />
            <Route path="/login"
              render={({ location }) =>
                !this.isLoggedIn() ? (
                  <LoginComponent />
                ) : (
                    <Redirect
                      to={{
                        pathname: "/",
                        state: { from: location }
                      }}
                    />
                  )
              } />
            <Route path="/"
              render={({ location }) =>
                this.isLoggedIn() ? (
                  <HomeComponent />
                ) : (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { from: location }
                      }}
                    />
                  )
              }></Route>
          </Switch>
        </div>
      </Router>
    )

  }
}