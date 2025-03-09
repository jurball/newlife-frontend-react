export async function fetchData(method = 'POST', url, headers = {}, body = {}) {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
        })

        return [await response.json(), response.status];
    } catch (error) {
        console.error(error);
        return {
            statusCode: error.status,
            message: error.message,
        }
    }
}