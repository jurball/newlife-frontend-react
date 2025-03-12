import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";

import {fetchData, setToken} from "../../api/api-utils";
import {endpoint} from "../../api/endpoint";

import InputField from "../components/UI/Form/InputField";
import ValidationError from "../components/UI/Form/ValidationError";
import {Auth} from "../../context/Auth";

export default function Login() {
    const { isAuth } = useContext(Auth);
    const { setAuth } = useContext(Auth);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [message, setMessage] = useState({});
    const [body, setBody] = useState({ email: "", password: "" });

    if (isAuth) {
        navigate("/cabinet");
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
            setToken(data.token);
            setAuth(true);
            navigate('/cabinet');
        } else {
            setMessage({ status: 'error' });
        }
        setLoading(false);
    }

    return (
        <main>
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
                <ValidationError message={message} />
                {loading && <div>Загрузка...</div>}
            </form>
        </main>
    );
}