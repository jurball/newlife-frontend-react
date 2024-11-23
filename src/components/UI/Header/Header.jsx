import './Header.module.css';
import MyLinks from '../../MyLinks';
import {Link} from "react-router";

export default function Header() {
    return (
        <header>
            <nav>
                <h1>
                    <Link to="/">
                        <img src="" alt="LOGO"/>
                    </Link>
                </h1>
                <MyLinks />
            </nav>
        </header>
    )
}