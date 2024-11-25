const PORT = 8000;
const apiUrl = `http://127.0.0.1:${PORT}`;

export const endpoint = {
    reg: apiUrl + '/registration',
    auth: apiUrl + '/authorization',
    logout: apiUrl + '/logout',
    files: apiUrl + '/files'
}