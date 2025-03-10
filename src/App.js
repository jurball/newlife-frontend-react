import './App.css';

import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import { Auth } from "./context/Auth";

import Header from './components/UI/Header';
import Footer from './components/UI/Footer';

function App() {
    const [isAuth, setAuth] = useState(false);
    console.log(isAuth);
    return (
        <Auth.Provider value={{
            isAuth,
            setAuth,
        }}>
            <Header/>
            <Outlet/>
            <Footer/>
        </Auth.Provider>
    );
}

export default App;
