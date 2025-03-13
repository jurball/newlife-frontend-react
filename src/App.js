import './App.css';
import React from "react";
import {Outlet, useLoaderData} from "react-router-dom";

import Header from './components/layout/Header/Header';
// import Footer from './components/layout/Footer/Footer';

import {checkToken} from "./api/api-utils";
import AuthProvider from "./context/Auth";

export const loader = async () => await checkToken();

function App() {
    const { isAuth } = useLoaderData();

    return (
        <AuthProvider initialState={isAuth}>
            <Header  />
            <main>
                <Outlet/>
            </main>
            {/*<Footer />*/}
        </AuthProvider>
    );
}

export default App;