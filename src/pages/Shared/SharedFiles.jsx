import React from "react";
import {endpoint} from "../../api/endpoint";
import {getToken, isNotArray} from "../../api/api-utils";

export default function SharedFiles(props) {
    if(isNotArray(props.shared)) return null;

    async function handleClickDownload(id) {
        try {
            const response = await fetch(endpoint.files + `/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при загрузки файла');
            }

            const blob = await response.blob();
            const urls = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = urls;

            const contentDisposition = response.headers.get('Content-Disposition');
            const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);

            a.download = fileNameMatch ? fileNameMatch[1] : `downloaded_file_${id}`;
            document.body.appendChild(a);

            a.click();
            document.body.removeChild(a);

            window.URL.revokeObjectURL(urls);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div className="box-share">
            {props.shared.map((shared, key) => (
                <div className="box-file" key={key}>
                    <p>Имя: {shared.name}</p>
                    <button onClick={() => handleClickDownload(shared.file_id)}>Download</button>
                </div>
            ))}
        </div>
    );
}