import {endpoint} from "./endpoint";

export async function fetchData(method = 'POST', url, headers = {}, body = {}) {
    try {
        const response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
        });

        return [await response.json(), response.status];
    } catch (error) {
        return [{
            statusCode: error.status,
            message: error.message,
        }, error.status]
    }
}

export async function checkToken() {
    try {
        const response = await fetch(endpoint.token, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            }
        });

        const json = await response.json();

        if (response.ok) {
            return { isAuth: true, json: json };
        }

        return { isAuth: false, json: json };
    } catch (e) {
        throw new Response("", {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
}

export async function getFiles() {
    try {
        const response = await fetch(endpoint.disk, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            }
        });

        if (response.ok) {
            const json = await response.json();
            return [true, json];
        }

        deleteToken();
        return [false, {}];
    } catch (e) {
        console.error(e)
    }
}

export function isNotArray(items) {
    if (!Array.isArray(items)) {
        return true;
    }

    return !items.length > 0;
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const deleteToken = () => {
    localStorage.removeItem('token');
}