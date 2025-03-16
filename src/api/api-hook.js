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
                    console.log(json);
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

export function useFoundFile() {
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

                if (response.status === 422) {
                    setData(await response.json());
                } else if(response.ok) {
                    const json = await response.json();
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

export function useEditFile() {

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

            console.log(json);
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