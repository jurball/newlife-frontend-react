import React from 'react';
import {useNavigate, useNavigation} from "react-router-dom";
import {endpoint} from "../../api/endpoint";
import {getToken} from "../../api/api-utils";

function BoxFile(props) {
    const navigation = useNavigation();
    const navigate = useNavigate();

    async function handleClickDownload() {
        try {
            const response = await fetch(endpoint.files + `/${props.file.file_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при загрузки файла');
            }

            // Получаем blob из ответа
            const blob = await response.blob();

            // Создаем временный URL
            const urls = window.URL.createObjectURL(blob);

            // Создаем временную ссылку для скачивания
            const a = document.createElement('a');
            a.href = urls;

            // Пытаемся извлечь имя файла из заголовка ответа
            const contentDisposition = response.headers.get('Content-Disposition');
            const fileNameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);

            // Устанавливаем имя файла
            a.download = fileNameMatch ? fileNameMatch[1] : `downloaded_file_${props.file.file_id}`;
            document.body.appendChild(a);

            // Автоматически кликаем по ссылке и удаляем объект
            a.click();
            document.body.removeChild(a);

            // Освобождаем память
            window.URL.revokeObjectURL(urls);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    function handleClickEdit() {
        navigation.file_id = props.file.file_id;
        navigate(`/cabinet/${props.file.file_id}/edit`);
    }

    function handleClickShare() {
        navigation.file_id = props.file.file_id;
        navigate(`/cabinet/${props.file.file_id}/accesses`);
    }

    async function handleClickDelete() {
        if(!window.confirm("Вы уверены что хотите удалить файл?")) return;

        try {
            const response = await fetch(endpoint.files + `/${props.file.file_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`,
                }
            });

            if (!response.ok) throw new Error('Произошла ошибка');

            props.setUpdate(true);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    async function handleClickDeleteShare() {
        navigation.file_id = props.file.file_id;
        navigate(`/cabinet/${props.file.file_id}/accesses/delete`);
    }

    return (
        <div className="box-file">
            <p>Имя файла: {props.file.name}</p>
            <button onClick={handleClickDownload}>Download</button>
            <button onClick={handleClickEdit}>Edit</button>
            <button onClick={handleClickShare} className="primary-button">Share</button>
            <button onClick={handleClickDeleteShare} className="danger-button">Delete Share</button>
            <button onClick={handleClickDelete} className="danger-button">Delete</button>
        </div>
    )
}

export default BoxFile;