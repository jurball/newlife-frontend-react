export async function postData(
    url,
    data,
    head = {
        'Content-Type': 'application/json'
}) {
    try {
        const post = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: head
        });

        const json = await post.json();

        return json;
    } catch(e) {
        console.log(e);
        console.error(e);
        // alert("DEBUG: ошибка функции postData");
    }
}

export async function postDataFile(url, data, token) {
    try {
        const post = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'Authorization': 'token ' + token
            }
        });

        const json = await post.json();

        return json;
    } catch(e) {
        console.log(e);
        console.error(e);
        // alert("DEBUG: ошибка функции postDataFile");
    }
}

export async function deleteDataFile(url, token) {
    try {
        const post = await fetch(url, {
            method: "DELETE",
            headers: {
                'Authorization': 'token ' + token
            }
        });


        return post.status;
    } catch(e) {
        console.log(e);
        console.error(e);
        // alert("DEBUG: ошибка функции postDataFile");
    }
}

export async function customFetch(url, method = "GET", head= {}) {
    try {
        let res = await fetch(url, {
            method: method,
            headers: head
        })
        let myBlob = await res.blob();
        return myBlob;
    } catch (e) {
        console.log(e);
    }
}

export async function getData(url, data) {
    try {
        const post = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${data}`
            }
        });

        const json = await post.json();

        return json;
    } catch(e) {
        console.log(e);
        console.error(e);
        // alert("DEBUG: ошибка функции getData");
    }
}

export function normalizeData(obj) {
    return {
        ...obj
    }
}