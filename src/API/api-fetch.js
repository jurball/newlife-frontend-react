export async function postData(url, data) {
    try {
        const post = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await post.json();

        return json;
    } catch(e) {
        console.log(e);
        console.error(e);
        alert("DEBUG: ошибка функции postData");
    }
}

export async function authPostData(url, data) {
    try {
        const post = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${data.token}`
            }
        });

        const json = await post.json();

        return json;
    } catch(e) {
        console.log(e);
        console.error(e);
        alert("DEBUG: ошибка функции postData");
    }
}

export async function getData(url, data) {
    try {
        const post = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token ${data.token}`
            }
        });

        const json = await post.json();
        console.log(data.token);

        return json;
    } catch(e) {
        console.log(e);
        console.error(e);
        alert("DEBUG: ошибка функции postData");
    }
}

export function normalizeData(obj) {
    return {
        ...obj
    }
}