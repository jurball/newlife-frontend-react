import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import Main from './components/UI/Main/Main';

import Routing from './routes/index';
import {BrowserRouter} from "react-router";
import { AuthContext } from './context';
import {useEffect, useState} from "react";

const Layout = ({ children }) => {
    let [isAuth, setIsAuth] = useState(false);
    let [mylinks, setMyLinks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
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

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            mylinks,
            setMyLinks
        }}>
            <BrowserRouter>
                <Header/>
                <Main children={children}></Main>
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
