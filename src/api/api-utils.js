import {endpoint} from "./endpoint";

/**
 * The fetchData
 *
 * @param method string The method
 * @param url string The url
 * @param headers object The headers
 * @param body object The body
 *
 */
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
        return [{
            statusCode: error.status,
            message: error.message,
        }, error.status]
    }
}

export async function getData(url, headers = {}) {
    try {
        const response = await fetch(url, { headers });

        return [await response.json(), response.status];
    } catch (error) {
        console.error(error);
        return [{
            statusCode: error.status,
            message: error.message,
        }, error.status]
    }
}

export async function logoutFetch(token) {
    const [data, code] = await getData(endpoint.logout, {
        'Authorization': `Bearer ${token}`
    });

    return [data, code];
}