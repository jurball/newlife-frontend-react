import React from 'react';
import {Link, Navigate} from "react-router-dom";

import {useAuth} from "../../context/Auth";
import {useAccessesFile} from "../../api/api-hook";

import NotFound from "../NotFound/NotFound";
import Forbidden from "../Forbidden/Forbidden";

import Preloader from "../../components/Preloader/Preloader";
import ValidationError from "../../components/ValidationError/ValidationError";
import InputField from "../../components/InputField/InputField";
import AddInfo from "../../components/AddInfo/AddInfo";



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

export default Accesses;