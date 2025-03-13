import Styles from './Cabinet.module.css';
import React, {useState} from 'react';
import {Form, Navigate, useLoaderData} from "react-router-dom";

import {useAuth} from '../../context/Auth';
import {endpoint} from "../../api/endpoint";
import {deleteToken} from "../../api/api-utils";

export async function loader() {
    try {
        const response = await fetch(endpoint.disk, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        });

        if (response.ok) {
            const json = await response.json();
            return { json: json };
        }

        if (response.status === 403) {
            return { json: {} };
        }

        throw new Error("");
    } catch (e) {
        throw new Response("", {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
}

export async function action() {

}

export default function Cabinet() {
    const { isAuth } = useAuth();
    const { json } = useLoaderData();

    const [files, setFiles] = useState(json);
    const [shared, setShared] = useState();

    if (!isAuth) {
        deleteToken();
        return <Navigate to="/login" replace />
    }

    console.log(json);

    return (
        <div className={`${Styles.content}`}>
            <ButtonLogout/>
            <Form method="post" className={`${Styles.formUpload}`}>
                <h1>Загрузить файл</h1>
                <input type="file" name="files[]" className={`${Styles.fileUpload}`} multiple/>
                <button type="submit">Submit</button>
            </Form>
            <UserFiles files={files} />
            <SharedFiles shared={shared} />
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
            {props.files && props.files.map((file, index) => (
                <BoxFile file={file} key={index} />
            ))}
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

    return (<h1>Доступные файлы</h1>);
}

function ButtonLogout() {
    const { logout } = useAuth();
    return <button className={`${Styles.buttonRight}`} onClick={() => logout()}>Выйти</button>;
}

function BoxFile(props) {
    console.log(props.file);

    return (
        <div>
            <p>Имя файла: {props.file.name}</p>
            <button>Скачать файл</button>
            <button>Удалить файл</button>
            {/*здесь надо вместо кнопок поставить кнопочки*/}
        </div>
    )
}