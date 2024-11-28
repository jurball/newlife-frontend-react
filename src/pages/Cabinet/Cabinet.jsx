import './Cabinet.modules.css';
import {useNavigate} from "react-router";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/index";

import Button from "../../components/UI/Button/Button";
import Formcontent from "../../components/UI/formcontent/Formcontent";
import { endpoint } from "../../API/config";
import { handleLogout, postFile, deleteFile } from "../../utils/cabinet-lib";

import {customFetch, getData} from "../../API/api-fetch";
import DownloadFileButton from "../../utils/FileDownload";
import FileEdit from "../../utils/FileEdit";
import AddAccess from "../../utils/AddAccess";
import DelAccess from "../../utils/DelAccess";

const url = endpoint.files;

export default function Cabinet() {
    const navigate = useNavigate();
    let {isAuth, setIsAuth} = useContext(AuthContext);
    let [posts, setPosts] = useState([]);
    let [share, setShare] = useState([]);

    const token = localStorage.getItem("token");

    async function myFile() {
        let res = await getData(url + "/disk", token);
        setPosts(res)
    }

    useEffect(() => {
        myFile();
        fetch(endpoint.shared, {
            method: "GET",
            headers: {
                "Authorization": "token " + token,
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                return res.json()
            })
            .then(json => {
                setShare([...json])
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (!isAuth) {
            setTimeout(() => {
                navigate("/login");
            }, 500)
        }
    }, [isAuth]);

    return (
        <div className="user">
            <div id="user__err"></div>
            <div className="user__head">
                <Button id="exit" onClick={() => handleLogout(setIsAuth, token)} type="submit">Выйти</Button>
            </div>
            <div className="user__body">
                <Formcontent title="Опубликуйте файл" encType="multipart/form-data" onSubmit={(e) => postFile(e, url, setPosts, posts)} style={{marginTop: 0}}>
                    <input type="file" name="files[]"/>
                    <Button id="fileBtn">Send</Button>
                </Formcontent>
                <h1>Ваши файлы</h1>

                <div id="content" style={{textAlign: "left"}}>
                    {posts.map((post, index) => (
                        <ul style={{width: "100%"}} key={index}>
                            <div style={{display: "flex", justifyContent: "space-between",}}>
                                <div>
                                    <p style={{margin: "10px 0"}}>Имя: {post.name}</p>
                                    <p style={{margin: "10px 0"}}>Индентификатор: {post.file_id}</p>
                                  </div>
                                <div style={{display: "flex"}}>
                                    <DownloadFileButton fileId={post.file_id}/>
                                    <Button onClick={() => deleteFile(url, `${endpoint.url}`, token, `${post.file_id}/`, setPosts)}>Delete</Button>
                                    <Button onClick={() => {
                                        fetch(endpoint.shared, {
                                            method: "GET",
                                            headers: {
                                                "Authorization": "token " + token,
                                                "Content-Type": "application/json"
                                            }
                                        })
                                            .then(res => {
                                                return res.json()
                                            })
                                            .then(json => {
                                                console.log(json)
                                            })
                                            .catch(err => console.log(err));
                                    }}>Share</Button>
                                    <div>
                                        <input placeholder="Имя" type="text" id={post.file_id}/>
                                        <FileEdit fileId={post.file_id}/>
                                        <input placeholder="E-mail для доступа" type="text" id={post.file_id + "1"}/>
                                        <AddAccess fileId={post.file_id}/>
                                        <input placeholder="E-mail удалить доступ" type="email" id={post.file_id + "2"}/>
                                        <DelAccess fileId={post.file_id}/>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </ul>
                    ))}
                    <div>
                        <h1>Файлы которые поделились пользователи</h1>
                        {share.map((post, index) => (
                            <ul key={index}>
                                <p>Имя: {post.name}</p>
                                <p>Индентификатор: {post.file_id}</p>
                                <hr/>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}