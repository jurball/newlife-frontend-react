export async function getData(url) {
    const get = await fetch(url);
    const data = await get.json();
    console.log(data);
    return data;
}

export async function postData(url, data) {
    const post = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(post);
}

export async function putData(url, data) {}