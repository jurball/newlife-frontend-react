import { useEffect, useState } from 'react';
import {endpoint} from "../../API/config"

export default function Backerr() {
    const [isBackendUp, setIsBackendUp] = useState(true);

    useEffect(() => {
        // Выполнить сетевой запрос к бэкенду
        fetch(endpoint.admin)
            .then(res => setIsBackendUp(true))
            .catch(() => {setIsBackendUp(false);});
    }, []);

    return {
        isBackendUp
    };
}