import React from 'react';
import {NavLink} from 'react-router-dom';
import Styles from './Footer.module.css';

function Footer(props) {
    return (
        <footer className={`${Styles.footer}`}>
            <nav className={`${Styles.navbar}`}>
                <h1>
                    LOGO
                </h1>
                <ul className={`${Styles.menu}`}>
                    {props.links}
                </ul>
            </nav>
        </footer>
    );
}

export default Footer;