import {base_url} from "./endpoint";

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

export async function checkToken() {
    // if (!localStorage.getItem("token")) {
    //     return { isAuth: false, json: {} };
    // }

    try {
        const response = await fetch(`${base_url}/files/check`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        })

        const json = await response.json();

        if (response.status === 404) {
            return { isAuth: true, json: json};
        }

        return { isAuth: false, json: json };
    } catch (e) {
        throw new Response("", {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
}

export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const deleteToken = () => {
    localStorage.removeItem('token');
}