import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { Auth } from "../../context/Auth";

import FormRegistration from "./FormRegistration";

export default function Registration() {
    const { isAuth } = useContext(Auth);

    return (
        isAuth ? <Navigate to="/" replace /> : <FormRegistration/>
    );
}

