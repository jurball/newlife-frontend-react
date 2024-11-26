import { NavLink } from "react-router";
import { AuthContext } from "../context";
import {useContext} from "react";

const activate = true;
const styleActive = "active";

export default function MyLinks() {
    let {mylinks} = useContext(AuthContext);

    const link = [
        ...mylinks
    ]

    return (
        <ul>
        {link.map((item, i) => (
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