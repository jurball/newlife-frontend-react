import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {Auth} from "../context/Auth";

function Links(props) {
    // const { isAuth } = useContext(Auth);

    if (props.isAuth) {
        return (
            <>
                <li>
                    <NavLink to="/">Index</NavLink>
                </li>
                <li>
                    <NavLink to="/cabinet">Cabinet</NavLink>
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