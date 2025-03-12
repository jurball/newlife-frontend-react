import React, {createContext, useEffect, useState} from 'react';

export const Auth = createContext({
    isAuth: false
});

export default function AuthProvider({ children }) {
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setAuth(true);
        }

    }, []);

    return (
        <Auth.Provider value={{
            isAuth,
            setAuth
        }}>
            {children}
        </Auth.Provider>
    )
}
