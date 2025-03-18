import React from 'react';
import {Link} from "react-router-dom";
import Styles from "./NotFound.module.css";

function NotFound() {
    return (
        <div className={`${Styles.content}`}>
            <h1>404 Not found</h1>
            <Link className={`${Styles.link}`} to="/">Назад</Link>
        </div>
    );
}

export default NotFound;