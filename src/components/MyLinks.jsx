import { NavLink } from "react-router";
import { AuthContext } from "../context";
import { useContext, useEffect } from "react";

const activate = true;
const styleActive = "active";

let links = [
    {
        href: "/about",
        label: "About",
    },
    {
        href: "/login",
        label: "Login"
    },
    {
        href: "/registration",
        label: "Registration"
    },
    {
        href: "/cabinet",
        label: "Cabinet"
    }
];

export default function MyLinks() {
    // let {link, setLinks, isAuth} = useContext(AuthContext);
    return (
        <ul>
        {links.map((item, i) => (
            <li key={i}>
                <NavLink
                    to={`${item.href}`}
                    className={({isActive}) => {
                        if(activate) 
                            return isActive ? styleActive : "";
                    }}>
                    {`${item.label}`}
                </NavLink>
            </li>
        ))}
        </ul>
    );
}