import { NavLink } from "react-router";

export default function MyLinks() {
    return (
        <ul>
            <li>
                <NavLink
                    to="/about"
                    className={({isActive}) =>
                        isActive ? "active" : ""
                    }
                    end>
                    About
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/login"
                    className={({isActive}) =>
                        isActive ? "active" : ""
                    }
                    end>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/registration"
                    className={({isActive}) =>
                        isActive ? "active" : ""
                    }
                    end>
                    Registration
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/cabinet"
                    className={({isActive}) =>
                        isActive ? "active" : ""
                    }
                    end>
                    Cabinet
                </NavLink>
            </li>
        </ul>
    );
}