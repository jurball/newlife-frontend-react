import Styles from './Header.module.css';
import React from "react";
import Links from '../Links';

export default function Header({ isAuth }) {
    return (
        <header className={`${Styles.header}`}>
            <nav className={`${Styles.navbar}`}>
                <h1>LOGO</h1>
                <ul className={`${Styles.menu}`}>
                    <Links isAuth={isAuth} />
                </ul>
            </nav>
        </header>
    )
}