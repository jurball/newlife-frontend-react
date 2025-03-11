import Styles from './Header.module.css';
import React from "react";
import Links from "../Links";

export default function Header(props) {
    return (
        <header className={`${Styles.header}`}>
            <nav className={`${Styles.navbar}`}>
                <h1>LOGO</h1>
                <ul className={`${Styles.menu}`}>
                    <Links />
                </ul>
            </nav>
        </header>
    )
}