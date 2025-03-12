import Styles from './Header.module.css';
import React from "react";
const Links = React.lazy(() => import('../Links'));

export default function Header() {
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