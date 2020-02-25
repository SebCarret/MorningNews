import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Homepage';
import Themes from './components/ThemeArticles';
import MyArticles from './components/MyArticles';

class App extends Component {

  render() {

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/themes/:id" component={Themes} />
          <Route path="/my-articles" component={MyArticles} />
        </Switch>
      </Router>
    );
  }
}

export default App;
