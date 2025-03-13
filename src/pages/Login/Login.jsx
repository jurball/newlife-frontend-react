import {Link, Navigate} from "react-router-dom";
import React, {useState} from "react";

import {fetchData} from "../../api/api-utils";
import {endpoint} from "../../api/endpoint";

import InputField from "../../components/UI/Form/InputField";
import ValidationError from "../../components/UI/Form/ValidationError";
import Preloader from "../../components/UI/Preloader/Preloader";

import {useAuth} from "../../context/Auth";

export default function Login() {
    const { isAuth, login } = useAuth();

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
        setError({});
        setMessage({});
        setLoading(true);

        const [data] = await fetchData("POST", endpoint.authorization, {
            'Content-Type': 'application/json'
        }, body);

        console.log(data);

        if (!data.success && typeof data.message === "object") {
            setMessage(data.message);
            setError(data.message);
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
            <button type="submit">Send</button>
            <Link to="/registration">Регистрация</Link>
            <ValidationError message={message}/>
            {loading && <Preloader />}
        </form>
    );
}