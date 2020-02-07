import React, { Component } from 'react';
import Home from './views/Home'

class App extends Component  {

  constructor(props) {
    super(props);
    this.state = { 
    }

}

  render() {

  return (
    <div className="App">
      <Home></Home>
    </div>
  );
  }
}

export default App;
