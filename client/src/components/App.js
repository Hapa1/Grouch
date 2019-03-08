import React, { Component } from 'react';
import '../static/App.css';
import Header from './Header'
import MapContainer from './MapContainer'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <MapContainer className="Map"></MapContainer>
      </div>
    );
  }
}

export default App;
