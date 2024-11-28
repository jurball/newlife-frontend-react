const PORT = 8000;
const apiUrl = `http://127.0.0.1:${PORT}`;
// const apiUrl = `http://192.168.1.12:${PORT}`
// const apiUrl = `http://192.168.1.156:${PORT}`;

export const endpoint = {
    reg: apiUrl + '/registration',
    auth: apiUrl + '/authorization',
    logout: apiUrl + '/logout',
    files: apiUrl + '/files',
    admin: apiUrl + '/admin/login/?next=/admin/',
    shared: apiUrl + '/shared',
    url: apiUrl
}