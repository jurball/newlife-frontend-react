import './App.css';
import React from "react";
import {Outlet} from "react-router-dom";

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

import {checkToken} from "./api/api-utils";

export const loader = async () => await checkToken();

function App() {
    return (
        <>
            <Header  />
            <Outlet/>
            <Footer />
        </>
    );
}

export default App;