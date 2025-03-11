import Styles from './PreLoader.module.css';
import React from 'react';

function PreLoader(props) {
    return (
        <main className={`${Styles.preloader}`}>
            <div className={`${Styles.bubblingG}`}>
                <span id={`${Styles.bubblingG_1}`}></span>
                <span id={`${Styles.bubblingG_2}`}></span>
                <span id={`${Styles.bubblingG_3}`}></span>
            </div>
        </main>
    );
}

export default PreLoader;