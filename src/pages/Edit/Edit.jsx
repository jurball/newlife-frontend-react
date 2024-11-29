import {Link, useParams} from "react-router"
import {endpoint} from "../../API/config";

export default function Edit() {
    const { fileId } = useParams();

    async function handleEdit(e) {
        e.preventDefault();
        await fetchEdit(e.target.filename.value);
    }

    async function fetchEdit(name) {
        let res = await fetch(endpoint.files + `/${fileId}/`, {
            method: "PATCH",
            body: JSON.stringify({
                "name": `${name}`
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${localStorage.getItem('token')}`
            }
        });
        // let data = await res.status;
        let json = await res.json();

        if(json.success) {
            document.querySelector(".err").innerHTML = json.message;
            return;
        }

        document.querySelector(".err").innerHTML = json.message;
    }

    return (
        <div className="edit">
            <form onSubmit={handleEdit}>
                <h1>Редактировать файл</h1>
                <input type="text" name="filename" placeholder="Новое имя файла"/>
                <input type="submit" value="Send"/>
                <div className="err"></div>
            </form>
            <Link to="/cabinet" style={{color: "white"}}><button>Back</button></Link>
        </div>
    )
}