import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {deleteToken, setToken} from "../api/api-utils";

export const Auth = createContext(null);

export default function AuthProvider({ children, initialState }) {
    const [isAuth, setAuth] = useState(initialState);
    const navigate = useNavigate();

    const login = (token) => {
        setToken(token)
        setAuth(true);
        navigate('/cabinet');
    }

    const logout = () => {
        deleteToken();
        setAuth(false);
        navigate('/');
    }

    return (
        <Auth.Provider value={{
            isAuth,
            setAuth,
            login,
            logout,
        }}>
            {children}
        </Auth.Provider>
    )
}

export const useAuth = () => {
    return useContext(Auth);
}