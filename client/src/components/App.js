import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import '../static/App.css';
import Header from './Header';
import MapContainer from './mapComponents/MapContainer';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <BrowserRouter>
            
            <Route exact path="/" component={MapContainer}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            
          </BrowserRouter>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
