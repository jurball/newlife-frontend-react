import React, {createContext, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

export const Auth = createContext({
    isAuth: false
});

export default function AuthProvider({ children }) {
    const [isAuth, setAuth] = useState(false);
    const [links, setLinks] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setAuth(true);
            setLinks(
                <>
                    <li>
                        <NavLink to="/">Index</NavLink>
                    </li>
                    <li>
                        <NavLink to="/cabinet">Cabinet</NavLink>
                    </li>
                </>
            );
        } else {
            setLinks(
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

    }, []);

    return (
        <Auth.Provider value={{
            isAuth,
            setAuth,
            links
        }}>
            {children}
        </Auth.Provider>
    )
}
