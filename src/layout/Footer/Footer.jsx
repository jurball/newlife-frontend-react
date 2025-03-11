import React from 'react';
import Styles from './Footer.module.css';
import Links from "../Links";

function Footer(props) {
    return (
        <footer className={`${Styles.footer}`}>
            <nav className={`${Styles.navbar}`}>
                <h1>LOGO</h1>
                <ul className={`${Styles.menu}`}>
                    <Links />
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;