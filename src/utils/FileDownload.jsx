import {endpoint} from "../API/config";

export default function DownloadFileButton({ fileId })  {
    const url = endpoint.files;
    const handleDownload = async () => {
        try {
            // Отправляем запрос на API
            const response = await fetch(`${url}/${fileId}/`, {
                method: 'GET',
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка при загрузке файла');
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
            const fileName = fileNameMatch ? fileNameMatch[1] : `downloaded_file_${fileId}`;

            a.download = fileName; // Устанавливаем имя файла
            document.body.appendChild(a);
            a.click(); // Автоматически кликаем по ссылке
            document.body.removeChild(a);

            // Освобождаем память, удаляя URL
            window.URL.revokeObjectURL(urls);
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
        }
    };

    return <button onClick={handleDownload}>Скачать файл</button>;
};