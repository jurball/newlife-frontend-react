import {useEffect, useState} from "react";
import {getFiles} from "./api-utils";
import {useAuth} from "../context/Auth";

export function useGetFiles() {
    const {setAuth} = useAuth();
    const [data, setData] = useState();

    useEffect(() => {
        async function loadData() {
            const [isAuth, json] = await getFiles();
            if (isAuth) {
                setData(json);
                console.log(json);
            } else {
                setAuth(false);
            }
        }

        loadData();
    }, [setAuth])

    return data;
}