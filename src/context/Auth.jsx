import React, {createContext, useContext, useState} from 'react';
import {deleteToken, setToken} from "../api/api-utils";

export const Auth = createContext(null);

export default function AuthProvider({ children, initialState }) {
    const [isAuth, setAuth] = useState(initialState);

    const login = (token) => {
        setToken(token)
        setAuth(true);
    }

    const logout = () => {
        deleteToken();
        setAuth(false);
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