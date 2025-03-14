import {Link, Navigate, useNavigate, useNavigation} from "react-router-dom";
import React, {useState} from "react";

import {checkToken, fetchData} from "../../api/api-utils";
import {endpoint} from "../../api/endpoint";

import InputField from "../../components/UI/Form/InputField";
import ValidationError from "../../components/UI/Form/ValidationError";
import Preloader from "../../components/UI/Preloader/Preloader";

import {useAuth} from "../../context/Auth";

export default function Login() {
    const { isAuth, login } = useAuth();
    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [message, setMessage] = useState({});
    const [body, setBody] = useState({ email: "", password: "" });

    if (isAuth) {
        return <Navigate to="/cabinet" replace/>
    }

    function handleChange(e) {
        setBody({ ...body, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    }

    async function handleForm(e) {
        e.preventDefault();
        setDisabled(true);
        setError({});
        setMessage({});
        setLoading(true);

        const [data, code] = await fetchData("POST", endpoint.authorization, {
            'Content-Type': 'application/json'
        }, body);

        console.log(data);

        if (!data.success && typeof data.message === "object") {
            setMessage(data.message);
            setError(data.message);
        } else if (data.message === "Failed to fetch") {
            setMessage({ status: "Ошибка сервера. Попробуйте позже или перегрузите страницу" });
        } else if (!data.success && typeof data.message === "string") {
            setMessage({ status: data.message });
            setError(data.message);
        } else if (data.success) {
            const result = login(data.token);
            if (typeof result === "object") {
                setMessage(result)
            }
        } else {
            setMessage({ status: data.message });
        }
        setLoading(false);
        setDisabled(false);
    }

    return (
        <form onSubmit={handleForm}>
            <h1>Авторизация</h1>
            <InputField
                label="E-mail"
                type="email"
                name="email"
                value={body.email}
                placeholder="Enter email"
                onChange={handleChange}
                error={error.email}
            />
            <InputField
                label="Password"
                type="password"
                name="password"
                value={body.password}
                placeholder="Enter password"
                onChange={handleChange}
                error={error.password}
            />
            <button type="submit" disabled={disabled}>Send</button>
            <Link to="/registration">Регистрация</Link>
            <ValidationError message={message}/>
            {loading && <Preloader />}
        </form>
    );
}