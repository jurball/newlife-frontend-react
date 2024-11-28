import {deleteDataFile, getData, postDataFile} from "../API/api-fetch";
import {endpoint} from "../API/config";

function errMessage(err, json, btn, color, text="") {
    err.style.background = color;
    btn.disabled = true;

    if(json.message === "undefined") {
        err.innerText = text;
    } else {
        err.innerText = json.message;
    }

    setTimeout(() => {
        err.innerText = '';
        err.style.padding = "0";
        btn.disabled = false;
    }, 2000)
}

export async function handleLogout(setIsAuth, token) {
    const url = endpoint.logout;
    document.getElementById("exit").disabled = false;
    let res = await getData(url, token);

    if(res.success) {
        localStorage.removeItem('token');
        setIsAuth(false);
        return;
    }

    setIsAuth(false);
    localStorage.removeItem('token');
    console.log("ОШИБКА handleLogout");
    alert("ОШИБКА handleLogout");
    document.getElementById("exit").disabled = true;
}


export async function postFile(e, url) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let err = document.getElementById("user__err");
    let btn = document.getElementById("fileBtn");

    let res = await postDataFile(url, formData, localStorage.getItem("token"));

    try {
        if (Array.isArray(res)) res = res[0];
        console.log(res);
        err.style.padding = "20px";

        if (res.success) {
            errMessage(err, res, btn, "green");
            return;
        }

        errMessage(err, res, btn, "red");
    } catch (e) {
        alert("Все плохо" + e);
        errMessage(err, res, btn, "red", "AAAAAAAAAAAAAAaaA");
    }
}

export async function deleteFile(url, token, id) {
    try {
        let res = await deleteDataFile(url + "/" + id, token);
        // let data = res.status;

        // return data;
    } catch (e) {
        console.log(e)
    }
}