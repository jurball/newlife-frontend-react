import Styles from './Forbidden.module.css';
import React from 'react';
import {Link} from "react-router-dom";

function Forbidden(props) {
    return (
        <div className={`${Styles.content}`}>
            <h1>Forbidden for you 403</h1>
            <Link className={`${Styles.link}`}  to="/cabinet">Назад</Link>
        </div>
    );
}

export default Forbidden;