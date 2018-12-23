import React, { Component } from 'react';
import Search from './components/Search';
import Movie from './components/Movie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <Router basename='/JSON_Data_Search'>
        <div>
          <Switch>
            <Route exact path='/' component={Search} />
            <Route exact path='/movie/:id' component={Movie} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
