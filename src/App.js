import React from 'react'
import {BrowserRouter as Router, Route}  from 'react-router-dom'

import Home from './views/Home'
import Header from './comps/Header'

function App() {
  return (
    <div className="App">
      <Header title="Play Maker">
      </Header>
      <Router>
          <div id="home-container">
            <Route exact path="/" component={Home}></Route>
          </div>
      </Router>
    </div>
  );
}

export default App;
