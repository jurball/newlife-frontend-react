import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import Main from './components/UI/Main/Main';

import Routing from './routes/index';
import {BrowserRouter} from "react-router";

//import {AuthContent} from './context/Index.jsx';

const Layout = ({ children }) => {
    return (
        <BrowserRouter>
            <Header/>
            <Main children={children}></Main>
            <Footer/>
        </BrowserRouter>
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
