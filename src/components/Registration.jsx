import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../api/endpoint';
import { fetchData } from '../api/api-utils';

function Registration() {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [message, setMessage] = useState({});
    const [body, setBody] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    function handleChange(e) {
        setBody({ ...body, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    }

    async function handleForm(e) {
        e.preventDefault();
        setError({});
        setMessage({});
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
            setError({});
            setMessage({ "status": "Неизвестная ошибка" })
        }
    }

    return (
        <main>
            <form onSubmit={handleForm}>
                <label htmlFor="">Имя</label>
                <input
                    type="text"
                    name="first_name"
                    className={`${!error.first_name && body.first_name ? body.first_name && "success" : error.first_name && "is-invalid"}`}
                    onChange={handleChange}
                />
                <label htmlFor="">Фамилия</label>
                <input
                    type="text"
                    name="last_name"
                    className={`${!error.last_name && body.last_name ? body.last_name && "success" : error.last_name && "is-invalid"}`}
                    onChange={handleChange}
                />
                <label htmlFor="">E-mail</label>
                <input
                    type="email"
                    name="email"
                    className={`${!error.email && body.email ? body.email && "success" : error.email && "is-invalid"}`}
                    onChange={handleChange}
                />
                <label htmlFor="">Password</label>
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

export default Registration;