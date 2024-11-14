import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../assets/Navbar.css';


const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">EFI - React + Flask</Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <NavLink to="/" exact activeClassName="active">
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clientes" activeClassName="active">
                        Clientes
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/usuarios" activeClassName="active">
                        Usuarios
                    </NavLink>
                </li>
            </ul>
            <div className="navbar-login">
                <Link to="/login" className="login-button">
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
