import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import Main from './components/UI/Main/Main';

import Backerr from './components/Backerr/Backerr';

import Routing from './routes/index';
import {BrowserRouter} from "react-router";
import { AuthContext } from './context';
import {useEffect, useState} from "react";

const Layout = ({ children }) => {
    let [isAuth, setIsAuth] = useState(false);
    let [mylinks, setMyLinks] = useState([]);
    const { isBackendUp } = Backerr();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("sd")
        if(token) {
            setIsAuth(true);
            setMyLinks([
                {href: "/about", label: "About"},
                {href: "/cabinet", label: "Cabinet"}
            ]);

        } else {
            setMyLinks([
                {href: "/about", label: "About"},
                {href: "/login", label: "Login"},
                {href: "/registration", label: "Register"},
            ])
        }
    }, [isAuth])
/*
 * второй способ для реализации приватных страниц и
 * приватных ссылок это
 * 1 создать проврку на авторизацию (глобальная переменная)
 * 2 Создать файл где хранится информация ссылок
 * 3 Создать пропсы для футера и хэдара
 * 4 У авторизованных будет в пропсах приватные ссылки
 * а неавторизованных будет шапка с публичными ссылками
 *
 * Таким образом будет чище код и проще реализовать
 */

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            mylinks,
            setMyLinks
        }}>
            <BrowserRouter>
                <Header/>
                <Main>{
                isBackendUp ? children : (
                    <div style={{textAlign:"center", height: "80vh", paddingTop: "230px" }}>
                        <h1>Ошибка сервера</h1>
                        <p>Ошибка сервера бэкенда</p>
                    </div>)}
                </Main>
                <Footer/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

function App() {
  return (
      <Layout>
          <Routing/>
      </Layout>
  );
}

export default App;
