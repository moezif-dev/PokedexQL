import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {isBool} from '../../utils';

export default ({id, name, image}) => {
	// parse localStorage value
	const storageKey = `catch_${name}`;
	const storageValue = JSON.parse(localStorage.getItem(storageKey))
	const defaultValue = storageValue || null;

	// set-up useState hook
	const [caught, setCaught] = useState(	defaultValue );
	
	useEffect(() => {
		// only use localStorage when caught is bool value (after user interactions)
		isBool(caught) && localStorage.setItem(storageKey, caught);
  }, [caught]);

	const onClick = event => setCaught(!caught);

	return (
		<div className="col-md-4 p-2">
			<div className="card text-white">
			  <div className="card-header">
			  	<div 
			  		className={`checkmark${caught ? " success": ""}`}
			  		onClick={onClick}
			  	/>
			  	<img className="pokemon-sprite mx-auto" src={image} alt={name} />
			  </div>
			  <div className="card-body bg-primary">
			    <Link to={`/pokemon/${name}`}>
			    	<h4 className="card-title">{`#${id}`} <span className="pokemon-name">{name }</span></h4>
			  	</Link>
			  </div>
			</div>
		</div>
	);
}