import React, {useEffect, useState} from 'react';
import {getToken} from "../../api/api-utils";
import {endpoint} from "../../api/endpoint";
import SharedFiles from "./SharedFiles";
import FileBone from "../../components/FileBone/FileBone";

function Shared() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getSharedFiles() {
            setLoading(true);
            const response = await fetch(endpoint.shared, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                }
            });

            const json = await response.json()
            console.log(response);
            console.log(json);
            setData(json);
            setLoading(false);
        }

        getSharedFiles();
    }, []);

    return (
        <div className="shared-container">
            <h1>Список доступных файлов</h1>
            {!data && !loading && <p>У вас нет доступных файлов</p>}
            {data ? <SharedFiles shared={data}/> : ""}
            {loading && <FileBone/>}
        </div>
    );
}

export default Shared;