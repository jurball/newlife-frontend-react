import React, {createContext, useContext, useState} from 'react';

export const Auth = createContext(null);

export default function AuthProvider({ children }) {
    const [isAuth, setAuth] = useState(false);

    const login = () => {
        setAuth(true);
    }

    const logout = () => {
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