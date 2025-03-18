import Styles from './Footer.module.css';
import React from "react";
import {Link} from "react-router-dom";

export default function Footer( ) {
    return (
        <footer className={`${Styles.footer}`}>
            <nav className={`${Styles.info}`}>
                <Link className={`${Styles.link}`} to="https://github.com/jurball/newlife-frontend-react">
                    <h1>MIT License @jurball</h1>
                </Link>
            </nav>
        </footer>
    )
}