import Styles from './Cabinet.module.css';
import React from 'react';
import {Navigate, useNavigate} from "react-router-dom";

import ValidationError from "../../components/ValidationError/ValidationError";
import Preloader from "../../components/Preloader/Preloader";
import FileBone from "../../components/FileBone/FileBone";
import UserFiles from "./UserFiles";

import {useAuth} from '../../context/Auth';
import {useCabinetFiles, useLogout} from "../../api/api-hook";

export default function Cabinet() {
    const { isAuth } = useAuth();
    const [handleSubmit, data, loading, success, message, setUpdate] = useCabinetFiles();

    if(!isAuth) {
        return <Navigate to="/login"/>
    }

    return (
        <div className={`${Styles.content}`}>
            <ButtonLogout/>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className={`${Styles.formUpload}`}>
                <h1>Загрузите файл</h1>
                <input type="file" name="files[]" className={`${Styles.fileUpload}`}/>
                <button type="submit" disabled={loading}>
                    { loading ? "Submitting" : "Отправить" }
                </button>
                {message && <ValidationError message={message} />}
                {success && <p className="success-text">Успешно</p>}
                {loading && <Preloader/>}
            </form>
            {data ? <UserFiles files={data} setUpdate={setUpdate} /> : <FileBone /> }
        </div>
    );
}

function ButtonLogout() {
    const logout = useLogout();

    return (
        <button
            className={`${Styles.buttonRight} danger-button`}
            onClick={() => window.confirm("Вы уверены что хотите выйти?") ? logout() : null}
        >
            Выйти
        </button>
    );
}