import React from 'react';
import {NavLink} from "react-router-dom";

function Links(props) {
    if (props.isAuth) {
        return (
            <>
                <li>
                    <NavLink to="/">Index</NavLink>
                </li>
                <li>
                    <NavLink to="/cabinet">Cabinet</NavLink>
                </li>
                <li>
                    <NavLink to="/logout">Выйти</NavLink>
                </li>
            </>
        );
    }

    return (
        <>
            <li>
                <NavLink to="/">Index</NavLink>
            </li>
            <li>
                <NavLink to="/registration">Registration</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
        </>
    );
}

export default Links;