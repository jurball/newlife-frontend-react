import React from 'react';
import {Link, Navigate} from "react-router-dom";

import {useEditFile} from "../../api/api-hook";
import {useAuth} from "../../context/Auth";

import NotFound from "../NotFound/NotFound";
import Forbidden from "../Forbidden/Forbidden";

import Preloader from "../../components/Preloader/Preloader";
import ValidationError from "../../components/ValidationError/ValidationError";
import InputField from "../../components/InputField/InputField";

function Edit() {
    const { isAuth } = useAuth();
    const [loading, forbidden, notFound, data, setBody] = useEditFile();

    async function handleSubmit(e) {
        e.preventDefault();
        setBody({
            name: e.target.name.value,
        })
    }

    if (!isAuth) return <Navigate to="/login"/>
    if(loading) return <Preloader />;
    if(forbidden) return <Forbidden />;
    if(notFound) return <NotFound />;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Edit</h1>
                <InputField
                    label="Имя файла"
                    name="name"
                    placeholder="Введите новое имя файла"
                />
                <button type="submit">Отправить</button>
                <Link to="/cabinet">Назад</Link>
            </form>
            {data && <ValidationError message={data?.message}/>}
            {data?.status && <p className="success-text">{data.status}</p>}
        </div>
    );
}

export default Edit;