import React, { useState } from 'react';
import { PokedexContainer } from '../';

export default () => {
	const [name, useName] = useState("kanto");

	// list of all pokedex regions
	const regions = ["kanto"];

	return (
		<div className="container text-center">
			<div className="btn-group">
			  {
			  	regions.map((region, index) => 
			  		<button
			  			key={`${index}_${region}`} 
			  			className={`text-capitalize btn btn-outline-primary${name === region ? " active" : ""}`}
			  		>
			  			{region}
			  		</button>
			  	)
			  }
			</div>
			<PokedexContainer pokedex={name}/>
		</div>
	)
}