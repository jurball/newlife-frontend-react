import {Route, Routes} from "react-router";

//page
import Error from "../components/Error/Error";
import Index from '../pages/Index/Index';
import About from '../pages/About/About';
import Registration from "../pages/Registration/Registration";
import Login from '../pages/Login/Login';
import Cabinet from '../pages/Cabinet/Cabinet';
import Edit from '../pages/Edit/Edit';
import Accesses from '../pages/Accesses/Accesses';

export default function Routing() {
    return (
        <Routes>
            <Route index path="/" element={<Index/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/cabinet" element={<Cabinet/>}/>
            <Route path="/edit/:fileId" element={<Edit/>}/>
            <Route path="/accesses/:fileId" element={<Accesses/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    );
}