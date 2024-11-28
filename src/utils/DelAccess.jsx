import {endpoint} from "../API/config";

export default function DelAccess({ fileId })  {
    const url = endpoint.files;
    const handleDownload = async () => {
        let EditInp = document.getElementById(fileId + "2");
        try {
            // Отправляем запрос на API
            const response = await fetch(`${url}/${fileId}/accesses`, {
                method: 'DELETE',
                body: JSON.stringify({
                    "email": `${EditInp.value}`
                }),
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });

            // if (!response.ok) {
            //     throw new Error('Ошибка при загрузке файла');
            // }

            const data = await response.status;
            console.log(data)

            return data;
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
        }
    };

    return <button onClick={handleDownload}>Del access</button>;
};