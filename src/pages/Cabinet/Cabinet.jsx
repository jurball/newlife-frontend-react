import './Cabinet.modules.css';
import {useNavigate} from "react-router";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../context/index";

import Button from "../../components/UI/Button/Button";
import {getData} from "../../API/api-fetch";
import { endpoint } from "../../API/config";

export default function Cabinet() {
    const navigate = useNavigate();
    let {isAuth, setIsAuth} = useContext(AuthContext);

    useEffect(() => {
        if(!isAuth) {
            setTimeout(() => {
                navigate("/login");
            }, 500)
        }
    });

    async function handleLogout() {
        const url = endpoint.logout;
        let res = await getData(url, {token: localStorage.getItem("token")});
        console.log(res);
        if(res.success) {
            localStorage.removeItem('token');
            console.log("Logout");
            setIsAuth(false);
            return;
        }
        setIsAuth(false);
        localStorage.removeItem('token');
        console.log("ОШИБКА handleLogout");
        alert("ОШИБКА handleLogout");
    }

    return (
        <div>
            <h1>Cabinet</h1>
            <Button onClick={handleLogout} type="submit">Выйти</Button>
        </div>
    )
}