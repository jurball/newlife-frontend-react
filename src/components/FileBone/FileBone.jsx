import Styles from './FileBone.module.css';
import React from 'react';

function FileBone() {
    return (
        <div className={Styles['file-box']}>
            <div className={`${Styles['file-bone-box-1']}`}>
                <div className={Styles['file-slider']}></div>
            </div>
            <div className={`${Styles['file-bone']}`}>
                <div className={Styles['file-slider']}></div>
            </div>
            <div className={`${Styles['file-bone-box-1']}`}>
                <div className={Styles['file-slider']}></div>
            </div>
            <div className={`${Styles['file-bone']}`}>
                <div className={Styles['file-slider']}></div>
            </div>
            <div className={`${Styles['file-bone-box-1']}`}>
                <div className={Styles['file-slider']}></div>
            </div>
            <div className={`${Styles['file-bone']}`}>
                <div className={Styles['file-slider']}></div>
            </div>
            <div className={`${Styles['file-bone-box-1']}`}>
                <div className={Styles['file-slider']}></div>
            </div>
            <div className={`${Styles['file-bone']}`}>
                <div className={Styles['file-slider']}></div>
            </div>
        </div>
    );
}

export default FileBone;