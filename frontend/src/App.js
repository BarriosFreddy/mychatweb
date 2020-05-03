import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HomeComponent } from './views/HomeComponent/HomeComponent';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      loggedIn: true
    }
  }

  render() {
    return (<div className="App">
      {this.state.loggedIn && <HomeComponent></HomeComponent>}
      {!this.state.loggedIn && <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
      </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
      </a>
      </header>}
    </div>)
  }
}