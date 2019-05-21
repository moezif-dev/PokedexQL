import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './assets/css/bootstrap.min.css';
import './App.scss';
// import logo from './logo.png';
import { Navbar } from './Navbar';
import { Pokedex } from './Pokedex';
import { PokemonDetails } from './PokemonDetails';

const client = new ApolloClient({
  uri: "/graphql", 
});

function App() {
  return (
    <ApolloProvider client={client}>
    	<Router>
    		<Navbar />
      	<Route exact path="/" component={Pokedex} />
      	<Route path="/pokemon/:name" component={PokemonDetails} />
      </Router>
    </ApolloProvider>
  );
}

export default App;