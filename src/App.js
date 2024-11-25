import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import Main from './components/UI/Main/Main';

import Routing from './routes/index';
import {BrowserRouter} from "react-router";
import { AuthContext } from './context';
import {useEffect, useState} from "react";

const Layout = ({ children }) => {
    let [isAuth, setIsAuth] = useState(false);
    let [link, setLinks] = useState([]);


    useEffect(() => {
        // const token = localStorage.getItem('token');
        // if(token) {
        //     setIsAuth(true);
        // }
        setIsAuth(true)
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            link,
            setLinks
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
