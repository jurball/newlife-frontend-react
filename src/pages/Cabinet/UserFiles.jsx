import React from 'react';
import BoxFile from "../../components/BoxFile/BoxFile";
import {isNotArray} from "../../api/api-utils";

function UserFiles(props) {
    if(isNotArray(props.files)) return null;

    return (
        <div>
            <h1>Список файлов</h1>
            {props.files && props.files.map((file, key) => (
                <BoxFile file={file} setUpdate={props.setUpdate} key={key} />
            ))}
        </div>
    )
}

export default UserFiles;