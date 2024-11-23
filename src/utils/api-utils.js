export const getToken = (token) => {
    localStorage.setItem('token', token);
    // document.cookie = "...";
}

export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const removeToken = () => {
    localStorage.removeItem('token');
}