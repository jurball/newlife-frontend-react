import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {Auth} from "../../context/Auth";

function Links() {
    const { isAuth } = useContext(Auth);

    if (isAuth) {
        return (
            <>
                <li>
                    <NavLink to="/">Index</NavLink>
                </li>
                <li>
                    <NavLink to="/cabinet">Cabinet</NavLink>
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
            <li>
                <NavLink to="/cabinet">Cabinet</NavLink>
            </li>
        </>
    );
}

export default Links;