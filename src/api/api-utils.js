import {base_url, endpoint} from "./endpoint";

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



export const getToken = () => {
    if (document.cookie === '') {
        return localStorage.getItem('token');
    }

    let token = document.cookie.split(';').find((item) => item.includes('token'));
    return token ? token.split('=')[1] : null;
}

export const setToken = (token) => {
    localStorage.setItem('token', token);
    document.cookie = `token=${token};`;
}

export const deleteToken = (token) => {
    localStorage.removeItem('token');
    document.cookie = `token=;`;
}

export const hasToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return { isAuth: false }
    }

    return { isAuth: true }
}

export async function checkToken() {
    if (localStorage.getItem("token")) {
        return { isAuth: false, json: {} };
    }

    const response = await fetch(`${base_url}/files/check`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    }).catch(() => {
        throw new Response("", {
            status: 500,
            statusText: "Internal Server Error",
        });
    });

    const json = await response.json();
    if (response.status === 404) {
        return { isAuth: true, json: json};
    }

    return { isAuth: false, json: json };
}