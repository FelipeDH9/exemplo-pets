import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
	return (
		<header>
			<nav>	
				<ul>
					<li> <Link to='/'>Home</Link> </li>
					<li> <Link to='/form-pet'>Cadatro de Pets</Link> </li>
					<li> <Link to='/list-pet'>Constulta</Link> </li>
					<li> <Link to='/contact'>Contato</Link> </li>
				</ul>
			</nav>	
		</header>
	);
}

export default Header;
