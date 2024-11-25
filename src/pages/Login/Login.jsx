// UI
import "./Login.modules.css";
import Input from "../../components/UI/Input/MyInput";
import Button from "../../components/UI/Button/Button";

// lib
import { postData } from '../../API/api-fetch';
import { endpoint } from "../../API/config";
// import {setToken} from "../../utils/api-utils";
import {handleErrForm} from "../../utils/lib";

// hook
import {useContext, useEffect} from "react";
import {AuthContext} from '../../context/index';
import {useNavigate} from "react-router";

export default function Login() {
    const navigate = useNavigate();
    let {isAuth, setIsAuth} = useContext(AuthContext);


    useEffect(() => {
        if(isAuth){
            navigate("/cabinet");
        }

        console.log(isAuth)
    });

    async function handleForm(e) {
        e.preventDefault();
        let err = document.getElementById("error");
        err.innerText = "";

        const url = endpoint.auth;

        const auth = {
            email: `${e.target.email.value}`,
            password: `${e.target.password.value}`
        }

        let res = await postData(url, auth);

        if (res.success) {
            localStorage.setItem("token", res.token);
            console.log(res);
            setIsAuth(true);
            navigate("/cabinet");
            return;
        }

        err.innerText = handleErrForm(res);
        console.log(res);
    }

    return (
        <form onSubmit={handleForm}>
            <h1>Форма авторизации</h1>
            <label htmlFor="">E-mail</label>
            <Input placeholder="E-mail" type="email" name="email"/>
            <label htmlFor="">Password</label>
            <Input placeholder="Password" type="password" name="password"/>
            <Button>Login</Button>
            <div id="error"></div>
        </form>
    )

}