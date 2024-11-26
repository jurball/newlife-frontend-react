import "./Registration.modules.css";
import Input from "../../components/UI/Input/MyInput";
import Button from "../../components/UI/Button/Button";
import {NavLink, useNavigate} from "react-router";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context";
import {postData} from "../../API/api-fetch";
import {endpoint } from "../../API/config";
import {handleErrForm} from "../../utils/lib";

export default function Login() {
    const navigate = useNavigate();
    let {isAuth, setIsAuth} = useContext(AuthContext);

    useEffect(() => {
        if(isAuth){
            navigate("/cabinet");
        }
    });

    async function handleForm(e) {
        e.preventDefault();
        let err = document.getElementById("error");
        err.innerText = "";

        const reg = {
            email: e.target.email.value,
            password: e.target.password.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last.value,
        }

        const url = endpoint.reg;
        let res = await postData(url, reg);
        console.log(res);

        if(res.success) {
            localStorage.setItem("token", res.token);
            setIsAuth(true);
            navigate("/cabinet");
            return;
        }

        err.innerText = handleErrForm(res);

        setTimeout(() => {
            err.innerText = '';
        }, 5000);
    }

    return (
        <form onSubmit={handleForm}>
            <h1>Форма регистрации</h1>
            <label htmlFor="">E-mail</label>
            <Input placeholder="E-mail" type="email" name="email"/>
            <label htmlFor="">Пароль</label>
            <Input placeholder="Пароль" type="password" name="password"/>
            <label htmlFor="">Имя</label>
            <Input placeholder="Name" type="text" name="first_name"/>
            <label htmlFor="">Фамилия</label>
            <Input placeholder="Name" type="text" name="last"/>
            <Button>Регистрация</Button>
            <p style={{color: "blue", textDecoration: "underline"}}><NavLink to="/login">Войти</NavLink></p>
            <div id="error"></div>
        </form>
    )

}