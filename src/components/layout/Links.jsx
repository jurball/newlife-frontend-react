import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";

import {Auth} from "../../context/Auth";

function Links() {
    const { isAuth } = useContext(Auth);

    if (isAuth) {
        return (
            <>
                <li>
                    <NavLink to="/">Главная</NavLink>
                </li>
                <li>
                    <NavLink to="/cabinet">Кабинет</NavLink>
                </li>
            </>
        );
    }

    return (
        <>
            <li>
                <NavLink to="/">Главная</NavLink>
            </li>
            <li>
                <NavLink to="/registration">Регистрация</NavLink>
            </li>
            <li>
                <NavLink to="/login">Авторизация</NavLink>
            </li>
        </>
    );
}

export default Links;