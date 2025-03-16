import React from 'react';
import {Link} from "react-router-dom";

import {useFoundFile} from "../../api/api-hook";
import NotFound from "../NotFound/NotFound";

import Preloader from "../../components/Preloader/Preloader";
import ValidationError from "../../components/ValidationError/ValidationError";
import InputField from "../../components/InputField/InputField";
import Forbidden from "../Forbidden/Forbidden";

function Edit() {
    const [loading, forbidden, notFound, data, setBody] = useFoundFile();

    async function handleSubmit(e) {
        e.preventDefault();
        setBody({
            name: e.target.name.value,
        })
    }

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
                    error={data?.message?.name}
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