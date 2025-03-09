import React, {useState, useContext} from 'react';
import { Auth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../api/endpoint';
import { fetchData } from '../api/api-utils';

function Login() {
    const navigate = useNavigate();
    const { setAuth } = useContext(Auth);
    const [body, setBody] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({});
    const [inputError, setInputError] = useState({});

    function handleChange(e) {
        setBody({ ...body, [e.target.name]: e.target.value });
        setInputError({...inputError, [e.target.name]: ""});
    }

    async function handleForm(e) {
        e.preventDefault();
        setError({});
        const [data] = await fetchData("POST", endpoint.authorization, {
            'Content-Type': 'application/json'
        }, body)
        // navigate('/cabinet');
        console.log(data);

        if (!data.success && typeof data.message === "object") {
            setError(data.message);
        } else if (!data.success && typeof data.message === "string") {
            setError({
                'status': data.message
            });
        } else if (data.success) {
            localStorage.setItem('token', data.token);
            setAuth(true);
            navigate('/cabinet');
        } else {
            setError({
                'status': 'Неизвестная ошибка'
            })
        }
    }

    return (
        <main>
            <form onSubmit={handleForm}>
                <label htmlFor="">
                    E-mail
                </label>
                <input
                    type="email" name="email"
                    className={`${error.email ? "is-invalid" : ""}`}
                    onChange={handleChange}
                />
                <label htmlFor="">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    className={`${error.password ? "is-invalid" : ""}`}
                    onChange={handleChange}
                />
                <button type="submit">Send</button>
            </form>
            <div className="box-error">
                {error && Object.entries(error).map(([key, value]) => (
                    <p className="is-invalid-text" key={key}>{value}</p>
                ))}
            </div>
        </main>
    );
}

export default Login;