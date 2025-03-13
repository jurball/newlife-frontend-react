import {Link, Navigate, useLoaderData, useNavigate} from "react-router-dom";
import React, {useState} from "react";

import {fetchData} from "../../api/api-utils";
import {endpoint} from "../../api/endpoint";

import ValidationError from "../../components/UI/Form/ValidationError";
import InputField from "../../components/UI/Form/InputField";
import Preloader from "../../components/UI/Preloader/Preloader";

export async function loader() {
    // const res = await fetch('http://localhost:8000/files/check', {
    //     method: 'GET',
    //     headers: {
    //         Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     }
    // });
    //
    // if (res.status === 404) {
    //     return { isAuth: false };
    // }

    return { isAuth: false };
}

export default function Registration() {
    const navigate = useNavigate();
    const { isAuth } = useLoaderData();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [message, setMessage] = useState({});
    const [body, setBody] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    if (isAuth) {
        return <Navigate to="/cabinet" replace />
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
        const [data] = await fetchData("POST", endpoint.registration, {
            'Content-Type': 'application/json'
        }, body);

        console.log(data);

        if (!data.success && typeof data.message === "object") {
            setError(data.message);
            setMessage(data.message);
        } else if (data.success) {
            navigate('/login');
        } else {
            setMessage({ status: data.message });
        }
        setLoading(false);
    }

    return (
        <main>
            <form onSubmit={handleForm}>
                <h1>Регистрация</h1>
                <InputField
                    label="Имя"
                    type="text"
                    name="first_name"
                    value={body.first_name}
                    placeholder="Enter first name"
                    onChange={handleChange}
                    error={error.first_name}
                />
                <InputField
                    label="Фамилия"
                    type="text"
                    name="last_name"
                    value={body.last_name}
                    placeholder="Enter last name"
                    onChange={handleChange}
                    error={error.last_name}
                />
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
                <Link to="/login">Войти</Link>
                <ValidationError message={message} />
                {loading && <Preloader />}
            </form>
        </main>
    );
}