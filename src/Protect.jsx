import React, {useContext} from 'react';
import ProtectedRoute from "./ProtectedRoute";
import {Auth} from "./context/Auth";

function Protect() {
    const { isAuth } = useContext(Auth);
    return (
        <ProtectedRoute isAuth={isAuth}/>
    );
}

export default Protect;