import React from "react";
import BoxFile from "../../components/BoxFile/BoxFile";

export default function SharedFiles(props) {
    if (!Array.isArray(props.shared)) {
        return null;
    }

    if (!props.shared.length > 0) {
        return null;
    }

    return (
        <div>
            <h1>Доступные файлы</h1>
            {props.files && props.files.map((file, index) => (
                <BoxFile file={file} key={index}/>
            ))}
        </div>
    );
}