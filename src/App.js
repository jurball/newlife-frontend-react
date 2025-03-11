import './App.css';

import React, {useEffect, useState} from "react";
import {useLoaderData, Outlet} from "react-router-dom";
import { Auth } from "./context/Auth";

import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import Links from './components/UI/Links';

// export function loader() {
//     return !!!localStorage.getItem("token");
// }

function App() {
    // const data = useLoaderData();
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setAuth(true);
        }
    }, []);

    console.log(isAuth);

    return (
        <Auth.Provider value={{
            isAuth,
            setAuth,
        }}>
            <Header links={<Links isAuth={isAuth} />} />
            <Outlet/>
            <Footer links={<Links isAuth={isAuth} />} />
        </Auth.Provider>
    );
}

export default App;
