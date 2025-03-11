import React, {useContext, useEffect, useState} from 'react';
import { Auth } from '../../../context/Auth';
import {Navigate, useNavigate} from "react-router-dom";
import Styles from './Cabinet.module.css';
import {logoutFetch} from "../../../api/api-utils";

export default function Cabinet() {
    return (
            <main>
                <ButtonLogout />
                <FilesControl />
            </main>
    );
}

function FilesControl(props) {
    return (
        <div className={`${Styles.content}`}>
            <FormUpload/>
            <UserFiles/>
            <SharedFiles/>
        </div>
    )
}

function FormUpload(props) {
    async function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className={`${Styles.formUpload}`}>
            <h1>Загрузить файл</h1>
            <input type="file" name="files[]" className={`${Styles.fileUpload}`} multiple/>
            <button type="submit">Submit</button>
        </form>
    )
}

function UserFiles(props) {
    const [files, setFiles] = useState();

    return (
        files && <h1>Ваши файлы</h1>
    )
}

function SharedFiles(props) {
    const [sharedFiles, setSharedFiles] = useState();

    return (
        sharedFiles && <h1>Доступные файлы</h1>
    )
}

function ButtonLogout(props) {
    const { setAuth } = useContext(Auth);

    async function logout() {
        const [data, code] = await logoutFetch(localStorage.getItem('token'));
        console.log(data, code);
        setAuth(false);
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
    }

    return (
        <button className={`${Styles.buttonRight}`} onClick={logout}>Выйти</button>
    )
}