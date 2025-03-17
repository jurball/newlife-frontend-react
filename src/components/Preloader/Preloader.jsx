import Styles from './Preloader.module.css';
import React from 'react';

function Preloader(props) {
    return (
        props.hydrate ?
        <main className={`${Styles.preloader}`}>
            <div className={`${Styles.bubblingG}`}>
                <span id={`${Styles.bubblingG_1}`}></span>
                <span id={`${Styles.bubblingG_2}`}></span>
                <span id={`${Styles.bubblingG_3}`}></span>
            </div>
        </main>
            :
        <div className={`${Styles.preloader}`}>
            <div className={`${Styles.bubblingG}`}>
                <span id={`${Styles.bubblingG_1}`}></span>
                <span id={`${Styles.bubblingG_2}`}></span>
                <span id={`${Styles.bubblingG_3}`}></span>
            </div>
        </div>
    );
}

export default Preloader;