import React from 'react';
import SharedFiles from "./SharedFiles";
import FileBone from "../../components/FileBone/FileBone";
import {useGetSharedFiles} from "../../api/api-hook";

function Shared() {
    const [data, loading] = useGetSharedFiles();

    return (
        <div className="shared-container">
            <h1>Shared files</h1>
            {data?.length === 0 && <p>У вас нет доступных файлов</p>}
            {data && <SharedFiles shared={data}/>}
            {loading && <FileBone/>}
        </div>
    );
}

export default Shared;