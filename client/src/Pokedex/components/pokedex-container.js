import React, { Component } from 'react';
import PokeCard from './poke-card';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const POKEMONS_QUERY = gql`
	query PokemonsQuery{
		  pokemons
			{
		    id,
		    name,
		    pokemon_details{
		      id,
		      name,
		      image
		    }
		  }
	}
`;

class PokedexContainer extends Component{

	render() {
		return (
			<div className="row">
				<Query query={POKEMONS_QUERY}>
					{
						({loading, error, data}) => {
							if(loading) return <h4>Loading...</h4>
							if(error) return <h4>Error!</h4>
							
							const { pokemons = {} } = data;
							const { pokemon_details = [] } = pokemons;
							return pokemon_details.map(poke => <PokeCard key={`${poke.id}_${poke.name}`} {...poke} />)
						}
					}
				</Query>
			</div>
		)
	}
}

// add prop types
export default PokedexContainer;