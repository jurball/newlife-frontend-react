import Styles from './Cabinet.module.css';
import React, {useState, Suspense, useEffect} from 'react';
import {Await, Form, Navigate, useFetcher, redirect, useLoaderData, useNavigation} from "react-router-dom";

import Preloader from "../../components/UI/Preloader/Preloader";

import {useAuth} from '../../context/Auth';
import {getFiles} from "../../api/api-utils";
import {useGetFiles} from "../../api/api-hook";

export async function loader() {
    return await getFiles(redirect);
}

export default function Cabinet() {
    const {isAuth} = useAuth();
    const data = useGetFiles();

    if(!isAuth){
        return <Navigate to="/login"/>
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        console.log(form);
    }

    return (
        <div className={`${Styles.content}`}>
            <ButtonLogout/>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className={`${Styles.formUpload}`}>
                <h1>Загрузить файл</h1>
                <input type="file" name="files[]" className={`${Styles.fileUpload}`} multiple/>
                <button type="submit">Submit</button>
            </form>
            {data ? <>
                <UserFiles files={data} />
                <SharedFiles shared={data} />
            </> : <Preloader />}
        </div>
    );
}

function UserFiles(props) {
    if (!Array.isArray(props.files)) {
        return null;
    }

    if (!props.files.length > 0) {
        return null;
    }

    return (
        <div>
            <h1>Ваши файлы</h1>
            <Suspense fallback={<Preloader/>}>
                {props.files && props.files.map((file, index) => (
                    <BoxFile file={file} key={index} />
                ))}
            </Suspense>
        </div>
    )
}

function SharedFiles(props) {
    if (!Array.isArray(props.shared)) {
        return null;
    }

    if (!props.shared.length > 0) {
        return null;
    }

    return (
        <div>
            <h1>Доступные файлы</h1>
            <Suspense fallback={<Preloader/>}>
                {props.files && props.files.map((file, index) => (
                    <BoxFile file={file} key={index}/>
                ))}
            </Suspense>
        </div>
    );
}

function BoxFile(props) {
    return (
        <div>
            <p>Имя файла: {props.file.name}</p>
            <button>Скачать файл</button>
            <button>Удалить файл</button>
            {/*здесь надо вместо кнопок поставить кнопочки*/}
        </div>
    )
}

function ButtonLogout() {
    const { logout } = useAuth();
    return <button className={`${Styles.buttonRight}`} onClick={() => logout()}>Выйти</button>;
}