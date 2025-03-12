import './App.css';
import React, {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import {useLoaderData} from "react-router-dom";

import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import AuthProvider from "./context/Auth";
import {getToken} from "./api/api-utils";

export async function loader() {
    const token = getToken();

    if (token) {
        return { isAuth: true };
    }


    return { isAuth: false };
}

function App() {
    // const { isAuth } = useLoaderData();
    // const isAuth = false;


    return (
        <AuthProvider>
            <Header   />
            <main>
                <Outlet/>
            </main>
            <Footer />
        </AuthProvider>
    );
}

export default App;
