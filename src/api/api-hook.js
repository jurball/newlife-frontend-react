import {useEffect, useState} from "react";
import {getFiles, getToken} from "./api-utils";
import {useAuth} from "../context/Auth";
import {endpoint} from "./endpoint";
import {useLocation} from "react-router-dom";

function useGetFiles() {
    const {setAuth} = useAuth();
    const [data, setData] = useState();
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        async function loadData() {
            setData(null);
            setUpdate(false);
            try {
                const [isAuth, json] = await getFiles();
                if (isAuth) {
                    setData(json);
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.error(error);
                alert("Произошла ошибка")
                window.location.reload();
            }
        }

        loadData();
    }, [setAuth, setUpdate, update]);

    return [data, setUpdate];
}

export function useEditFile() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState();
    const [forbidden, setForbidden] = useState(false);
    const [body, setBody] = useState({});

    useEffect(() => {
        async function getFile() {
            try {
                setLoading(true);
                const response = await fetch(endpoint.files + `/${location.pathname.split('/')[2]}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`,
                    },
                    body: JSON.stringify(body)
                });

                const json = await response.json()

                if (response.status === 422) {
                    setData(json);
                } else if(response.ok) {
                    setData({ status: json.message });
                } else if (response.status === 403) {
                    setForbidden(true);
                } else if (response.status === 404) {
                    setNotFound(true);
                } else {
                    throw new Error("Unknown error");
                }
            } catch (error) {
                console.error(error);
                alert("Произошла ошибка")
                window.location.reload();
            }
            setLoading(false);
        }

        getFile();
    }, [body, location.pathname, setBody]);

    return [loading, forbidden, notFound, data, setBody];
}

export function useGetSharedFiles() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getSharedFiles() {
            setLoading(true);
            const response = await fetch(endpoint.shared, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                }
            });

            const json = await response.json()
            setData(json);
            setLoading(false);
        }

        getSharedFiles();
    }, []);

    return [data, loading];
}

export function useAccessesFile() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState();
    const [forbidden, setForbidden] = useState(false);
    const [body, setBody] = useState({});
    const [userNotFound, setUserNotFound] = useState(false);

    useEffect(() => {
        async function getFile() {
            try {
                setLoading(true);
                setUserNotFound(false);
                setData();

                const findFile = await fetch(endpoint.files + `/${location.pathname.split('/')[2]}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${getToken()}`,
                    }
                })

                if(findFile.status === 404) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                const response = await fetch(endpoint.files + `/${location.pathname.split('/')[2]}/access`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`,
                    },
                    body: JSON.stringify(body)
                });

                const json = await response.json();

                if (response.status === 422) {
                    setData(json);
                } else if(response.ok) {
                    setData({ status: json });
                } else if (response.status === 403) {
                    setForbidden(true);
                } else if (response.status === 404) {
                    setUserNotFound(json);
                } else if (response.status === 409) {
                    setData({ exists: json });
                }
                else {
                    throw new Error("Unknown error");
                }
            } catch (error) {
                console.error(error);
                alert("Произошла ошибка")
                window.location.reload();
            }
            setLoading(false);
        }

        getFile();
    }, [body, location.pathname, setBody]);

    return [loading, forbidden, notFound, userNotFound, data, setBody];
}

export function useAccessesDeleteFile() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [data, setData] = useState();
    const [forbidden, setForbidden] = useState(false);
    const [body, setBody] = useState({});
    const [userNotFound, setUserNotFound] = useState(false);

    useEffect(() => {
        async function getFile() {
            try {
                setLoading(true);
                setUserNotFound(false);
                setData();

                const findFile = await fetch(endpoint.files + `/${location.pathname.split('/')[2]}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${getToken()}`,
                    }
                })

                if(findFile.status === 404) {
                    setNotFound(true);
                    setLoading(false);
                    return;
                }

                const response = await fetch(endpoint.files + `/${location.pathname.split('/')[2]}/access`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`,
                    },
                    body: JSON.stringify(body)
                });

                const json = await response.json();

                if (response.status === 422) {
                    setData(json);
                } else if(response.ok) {
                    setData({ status: json });
                } else if (response.status === 403) {
                    setForbidden(true);
                } else if (response.status === 404) {
                    setUserNotFound(json);
                } else if (response.status === 409) {
                    setData({ exists: json });
                }
                else {
                    throw new Error("Unknown error");
                }
            } catch (error) {
                console.error(error);
                alert("Произошла ошибка")
                window.location.reload();
            }
            setLoading(false);
        }

        getFile();
    }, [body, location.pathname, setBody]);

    return [loading, forbidden, notFound, userNotFound, data, setBody];
}

export function useCabinetFiles() {
    const [data, setUpdate] = useGetFiles();
    const [message, setMessage] = useState({});
    const [success, setSuccess] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setFormLoading(true);
            setMessage({});
            setSuccess(false);

            const response = await fetch(endpoint.files, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${getToken()}`,
                },
                body: new FormData(e.target)
            });

            const json = await response.json();
            e.target.reset();

            if(response.status === 422) {
                setMessage(json.message);
            } else if(response.status === 200) {
                setSuccess(true);
            } else {
                setMessage({ status: "Неизвестная ошибка" });
            }

            setUpdate(true);
            setFormLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    return [handleSubmit, data, formLoading, success, message, setUpdate];
}

export function useLogout() {
    const { logout } = useAuth();

    async function logoutSend() {
        try {
            const response = await fetch(endpoint.logout, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            });

            if (response.ok) {
                logout();
                return;
            }

            throw new Error("Error: No logged out");
        } catch (error) {
            alert("Error: No logged out");
            console.error(error);
        }
    }

    return logoutSend;
}