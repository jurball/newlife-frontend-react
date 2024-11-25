
//let s = await postData('http://127.0.0.1:8000/authorization', auth)
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
        alert(e);
    }
}

export function normalizeData(obj) {
    return {
        ...obj
    }
}