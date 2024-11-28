import {endpoint} from "../API/config";

export default function FileEdit({ fileId })  {
    const url = endpoint.files;
    const handleDownload = async () => {
        let EditInp = document.getElementById(fileId);
        try {
            // Отправляем запрос на API
            const response = await fetch(`${url}/${fileId}/`, {
                method: 'PATCH',
                body: JSON.stringify({
                    "name": `${EditInp.value}`
                }),
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при загрузке файла');
            }

            const data = await response.json();
            console.log(data)

            return data;
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
        }
    };

    return <button onClick={handleDownload}>Edit</button>;
};