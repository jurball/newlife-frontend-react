import './Footer.module.css';
import MyLinks from '../../MyLinks';
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer>
            <nav>
                <h1>
                    <Link to="/">
                        <img src="" alt="LOGO"/>
                    </Link>
                </h1>
                <MyLinks />
            </nav>
        </footer>
    )
}