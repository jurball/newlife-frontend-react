import React, { useContext } from 'react';
import { Auth } from '../../context/Auth';
import { Navigate } from 'react-router-dom';

import FormLogin from './FormLogin';

export default function Login() {
    const { isAuth } = useContext(Auth);

    return (
        isAuth ? <Navigate to="/"/> : <FormLogin />
    );
}