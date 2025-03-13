export const base_url = 'http://127.0.0.1:8000';
// В будущем
// export const base_url = `${process.env.BASE_URL_SERVER_API}`;


export const endpoint = {
    "registration": `${base_url}/registration`,
    "authorization": `${base_url}/authorization`,
    "logout": `${base_url}/logout`,
    "disk": `${base_url}/files/disk`,
};