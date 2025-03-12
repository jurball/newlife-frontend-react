import React from 'react';
import Styles from './Footer.module.css';
import Links from "../Links";

export default function Footer({isAuth}) {
    return (
        <footer className={`${Styles.footer}`}>
            <nav className={`${Styles.navbar}`}>
                <h1>LOGO</h1>
                <ul className={`${Styles.menu}`}>
                    <Links isAuth={isAuth} />
                </ul>
            </nav>
        </footer>
    );
}
