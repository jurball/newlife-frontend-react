import React, {useState, useContext} from 'react';
import { Auth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../api/endpoint';
import { fetchData } from '../api/api-utils';

function Login() {
    const { setAuth } = useContext(Auth);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [message, setMessage] = useState({});
    const [body, setBody] = useState({ email: "", password: "" });

    function handleChange(e) {
        setBody({ ...body, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    }

    async function handleForm(e) {
        e.preventDefault();
        setError({});
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
            localStorage.setItem('token', data.token);
            setAuth(true);
            navigate('/cabinet');
        } else {
            setMessage({ status: 'error' });
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
                    className={`${!error.email && body.email ? body.email && "success" : error.email && "is-invalid"}`}
                    onChange={handleChange}
                />
                <label htmlFor="">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    className={`${!error.password && body.password ? body.password && "success" : error.password && "is-invalid"}`}
                    onChange={handleChange}
                />
                <button type="submit">Send</button>
            </form>
            <div className="box-error">
                {message && Object.entries(message).map(([key, value]) => (
                    <p className="is-invalid-text" key={key}>{value}</p>
                ))}
            </div>
        </main>
    );
}

export default Login;