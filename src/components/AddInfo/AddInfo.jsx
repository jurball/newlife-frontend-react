import Styles from './AddInfo.module.css';
import React from "react";

export default function AddInfo(props) {
    if(props.delete) return (
        <div className={`${Styles.content}`}>
            <p>Email: {props.data[0].email}</p>
            <p>Fullname: {props.data[0].fullname}</p>
            <p>Type: {props.data[0].type}</p>
        </div>
    );

    return (
        <>
            <div className={`${Styles.content}`}>
                <p>Email: {props.data[0].email}</p>
                <p>Fullname: {props.data[0].fullname}</p>
                <p>Type: {props.data[0].type}</p>
            </div>
            <div className={`${Styles.content}`}>
                <p>Email: {props.data[1].email}</p>
                <p>Fullname: {props.data[1].fullname}</p>
                <p>Type: {props.data[1].type}</p>
            </div>
        </>
    )
}