import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
		  <Link to="/" className="navbar-brand">PokedexQL</Link>
		</nav>
	)
};
export default Navbar;
