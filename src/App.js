import './App.css';
import React from "react";
import {Outlet} from "react-router-dom";

import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import AuthProvider from "./context/Auth";

function App() {
    return (
        <AuthProvider>
            <Header />
            <Outlet/>
            <Footer />
        </AuthProvider>
    );
}

export default App;
