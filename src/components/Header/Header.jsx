import Styles from './Header.module.css';
import React from "react";
import Links from '../Links/Links';
import {Link} from "react-router-dom";

export default function Header({ isAuth }) {
    return (
        <header className={`${Styles.header}`}>
            <nav className={`${Styles.navbar}`}>
                <Link to="/" className={`${Styles.link}`}><h1>NewLife-storage</h1></Link>
                <ul className={`${Styles.menu}`}>
                    <Links isAuth={isAuth} />
                </ul>
            </nav>
        </header>
    )
}