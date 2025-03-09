import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../api/endpoint';
import { fetchData } from '../api/api-utils';

function Registration() {
    const navigate = useNavigate();
    const [body, setBody] = useState({
        first_name: "",
        last_name: "",
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
        const [data] = await fetchData("POST", endpoint.registration, {
            'Content-Type': 'application/json'
        }, body)
        if (!data.success) {
            setError(data.message);
            setInputError(data.message);
        } else if (data.success) {
            navigate('/login');
        } else {
            setError({
                "status": "Неизвестная ошибка",
            });
        }
    }

    return (
        <main>
            <form onSubmit={handleForm}>
                <label htmlFor="">Имя</label>
                <input type="text" name="first_name" className={`${inputError.first_name ? "is-invalid" : ""}`} onChange={handleChange} />
                <label htmlFor="">Фамилия</label>
                <input type="text" name="last_name" className={`${inputError.last_name ? "is-invalid" : ""}`} onChange={handleChange}/>
                <label htmlFor="">E-mail</label>
                <input type="email" name="email" className={`${inputError.email ? "is-invalid" : "" }`} onChange={handleChange}/>
                <label htmlFor="">Password</label>
                <input type="password" name="password" className={`${inputError.password ? "is-invalid" : ""}`} onChange={handleChange}/>
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

export default Registration;