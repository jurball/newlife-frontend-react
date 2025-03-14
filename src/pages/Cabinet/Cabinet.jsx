import Styles from './Cabinet.module.css';
import React, {useState, Suspense, useEffect} from 'react';
import {Await, Form, Navigate, useFetcher, redirect, useLoaderData, useNavigation} from "react-router-dom";

import Preloader from "../../components/UI/Preloader/Preloader";

import {useAuth} from '../../context/Auth';
import {getFiles} from "../../api/api-utils";

export async function loader() {
    return await getFiles(redirect);
}

export default function Cabinet() {
    const context = useAuth();
    const fetcher = useFetcher();
    const fetcherForm = useFetcher();

    useEffect(() => {
        if (fetcher.state === "idle" && !fetcher.data) {
            fetcher.load("/cabinet/disk");
        }

    }, [fetcher]);

    console.log(fetcher.data)

    return (
        <div className={`${Styles.content}`}>
            <ButtonLogout/>
            <fetcherForm.Form encType="multipart/form-data" className={`${Styles.formUpload}`}>
                <h1>Загрузить файл</h1>
                <input type="file" name="files[]" className={`${Styles.fileUpload}`} multiple/>
                <button type="submit">Submit</button>
            </fetcherForm.Form>
            {fetcher.data ?
                <>
                    <UserFiles files={fetcher.data.json} />
                    <SharedFiles shared={fetcher.data.json} />
                </> :
            <Preloader />}
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
    // console.log(props.file);

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