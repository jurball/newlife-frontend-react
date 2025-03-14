import './App.css';
import React from "react";
import {Outlet, useLoaderData, useNavigation} from "react-router-dom";

import Header from './components/layout/Header/Header';
// import Footer from './components/layout/Footer/Footer';

import {checkToken} from "./api/api-utils";
import AuthProvider from "./context/Auth";
import Preloader from "./components/UI/Preloader/Preloader";

export const loader = async () => await checkToken();

function App() {
    const { isAuth } = useLoaderData();
    const navigation = useNavigation();
    console.log(`${process.env.REACT_APP_API_URL}`);

    return (
        <AuthProvider initialState={isAuth}>
            <Header  />
            <main>
                {navigation.state === "loading" ? <Preloader/> : <Outlet/>}
            </main>
            {/*<Footer />*/}
        </AuthProvider>
    );
}

export default App;