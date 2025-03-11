import './App.css';
import React, {useContext, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";

import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import ProtectedRoute from './ProtectedRoute';
import {Auth} from "./context/Auth";

function App() {
    const { isAuth, setAuth } = useContext(Auth);

    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default App;
