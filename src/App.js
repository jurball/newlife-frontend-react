import './App.css';
import React from "react";
import {useLoaderData} from "react-router-dom";

import Header from './components/Header/Header';
import Main from './components/Main/Main';

import {checkToken} from "./api/api-utils";
import AuthProvider from "./context/Auth";

export const loader = async () => await checkToken();

function App() {
    const { isAuth } = useLoaderData();

    return (
        <AuthProvider initialState={isAuth}>
            <Header />
            <Main />
        </AuthProvider>
    );
}

export default App;