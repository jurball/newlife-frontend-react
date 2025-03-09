import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
    return (
        <div>
            Header
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Index</NavLink>
                    </li>
                    <li>
                        <NavLink to="/home">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/registration">Registration</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;