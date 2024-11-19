import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ onLogout }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout(); 
        navigate('/login'); 
    };

    return (
        <div className='header'>
            <div className='nav-container'>
                <Link to="/form-pet"><div className='nav-item'>Cadastro de Carros</div></Link>
                <Link to="/form-users"><div className='nav-item'>Cadastro de Usuários</div></Link>
                <Link to="/list-pet"><div className='nav-item'>Consulta Carros</div></Link>
                <Link to="/list-users"><div className='nav-item'>Consulta Usuários</div></Link> 
            </div>
            <div className='nav-container'>
                {token ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={() => navigate('/login')}>Login</button>
                )}
            </div>
        </div>
    );
    
}

export default Header;
