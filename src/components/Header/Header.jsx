import Styles from './Header.module.css';
import React from "react";
import Links from '../Links/Links';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className={`${Styles.header}`}>
            <nav className={`${Styles.navbar}`}>
                <Link to="/" className={`${Styles.link}`}><h1>NewLife-storage</h1></Link>
                <ul className={`${Styles.menu}`}>
                    <Links />
                </ul>
            </nav>
        </header>
    )
}