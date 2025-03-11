import Styles from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import React from "react";

export default function Header(props) {
    return (
        <header className={`${Styles.header}`}>
            <nav className={`${Styles.navbar}`}>
                <h1>
                    LOGO
                </h1>
                <ul className={`${Styles.menu}`}>
                    {props.links}
                </ul>
            </nav>
        </header>
    )
}