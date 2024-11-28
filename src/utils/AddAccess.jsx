import {endpoint} from "../API/config";

export default function AddAccess({ fileId })  {
    const url = endpoint.files;
    const handleDownload = async () => {
        let EditInp = document.getElementById(fileId + "1");
        console.log(EditInp.value);
        try {
            // Отправляем запрос на API
            const response = await fetch(`${url}/${fileId}/accesses`, {
                method: 'POST',
                body: JSON.stringify({
                    "email": `${EditInp.value}`
                }),
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });



            const data = await response.status;
            console.log(data)

            return data;
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
        }
    };

    return <button onClick={handleDownload}>Accesss</button>;
};