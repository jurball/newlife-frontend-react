import Styles from './Accesses.module.css';
import React from 'react';
import {Link, Navigate} from "react-router-dom";

import {useAccessesFile} from "../../api/api-hook";
import NotFound from "../NotFound/NotFound";

import Preloader from "../../components/Preloader/Preloader";
import ValidationError from "../../components/ValidationError/ValidationError";
import InputField from "../../components/InputField/InputField";
import Forbidden from "../Forbidden/Forbidden";
import {useAuth} from "../../context/Auth";

function Accesses() {
    const {isAuth} = useAuth();
    const [loading, forbidden, notFound, userNotFound, data, setBody] = useAccessesFile();

    async function handleSubmit(e) {
        e.preventDefault();
        setBody({
            email: e.target.name.value,
        })
    }

    if (!isAuth) return <Navigate to="/login"/>
    if(loading) return <Preloader />;
    if(forbidden) return <Forbidden />;
    if(notFound) return <NotFound />;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Accesses (Share)</h1>
                <InputField
                    label="Введите e-mail"
                    name="name"
                    placeholder="Введите e-mail пользователя"
                />
                <button type="submit">Отправить</button>
                <Link to="/cabinet">Назад</Link>
            </form>
            {data && !userNotFound && <ValidationError message={data?.message}/>}
            {userNotFound && <ValidationError message={userNotFound}/>}
            {data?.exists && <ValidationError message={data?.exists}/>}
            {data?.status && <AddInfo data={data?.status}/>}
        </div>
    );
}

function AddInfo(props) {
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

export default Accesses;