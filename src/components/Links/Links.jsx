import Styles from './Links.module.css';
import React from 'react';
import {NavLink} from "react-router-dom";

import {useAuth} from "../../context/Auth";


function Links() {
    const { isAuth } = useAuth();

    if (isAuth) {
        return (
            <>
                <li className={`${Styles.link}`}>
                    <NavLink to="/">Главная</NavLink>
                </li>
                <li className={`${Styles.link}`}>
                    <NavLink to="cabinet">Кабинет</NavLink>
                </li>
                <li className={`${Styles.link}`}>
                    <NavLink to="shared" replace>Shared</NavLink>
                </li>
            </>
        );
    }

    return (
        <>
            <li className={`${Styles.link}`}>
                <NavLink to="/">Главная</NavLink>
            </li>
            <li className={`${Styles.link}`}>
                <NavLink to="/registration">Регистрация</NavLink>
            </li>
            <li className={`${Styles.link}`}>
                <NavLink to="/login">Авторизация</NavLink>
            </li>
        </>
    );
}

export default Links;