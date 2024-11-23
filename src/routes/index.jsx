import {Route, Routes} from "react-router";

//page
import Error from "../components/Error/Error";
import Index from '../pages/Index/Index';
import About from '../pages/About/About';
import Registration from "../pages/Registration/Registration";

export default function Routing() {
    return (
        <Routes>
            <Route index path="/" element={<Index/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/login" element={<Registration/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    );
}