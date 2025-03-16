export const base_url = `${process.env.REACT_APP_API_URL}`;

export const endpoint = {
    registration: `${base_url}/registration`,
    authorization: `${base_url}/authorization`,
    logout: `${base_url}/logout`,
    disk: `${base_url}/files/disk`,
    files: `${base_url}/files`,
    accesses: `${base_url}/accesses`,
    token: `${base_url}/token`,
};