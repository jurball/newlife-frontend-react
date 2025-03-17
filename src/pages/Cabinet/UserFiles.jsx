import React from 'react';
import BoxFile from "../../components/BoxFile/BoxFile";

function UserFiles(props) {
    if (!Array.isArray(props.files)) {
        return null;
    }

    if (!props.files.length > 0) {
        return null;
    }

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