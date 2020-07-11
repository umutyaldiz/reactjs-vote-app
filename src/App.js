import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './scss/main.scss';
import HomePage from './pages/HomePage';
import Detail from './pages/Detail';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <header className="header">
            <h1>ReactJS - Vote App</h1>
          </header>
          <Route exact path="/" component={HomePage} />
          <Route path="/create" component={Detail} />
          <Route path="/detail/:itemID" component={Detail} />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;