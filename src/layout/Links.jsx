import {Auth} from "../context/Auth";
import {useContext} from "react";

function Links(props) {
    const { links } = useContext(Auth);
    return links;
}

export default Links;