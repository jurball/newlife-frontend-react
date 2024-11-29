import {Link, useParams} from "react-router"
import {endpoint} from "../../API/config";

export default function Accesses() {
    const { fileId } = useParams();

    async function handleEdit(e) {
        e.preventDefault();
        await fetchEdit(e.target.filename.value);
    }

    async function fetchEdit(email) {
        console.log(email)
        let res = await fetch(endpoint.files + `/${fileId}/accesses`, {
            method: "POST",
            body: JSON.stringify({
                "email": `${email}`
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${localStorage.getItem('token')}`
            }
        });
        // let data = await res.status;
        let json = await res.json();
        let status = res.status;
        console.log(status);

        if(status === 404) {
            document.querySelector(".err").innerHTML = "404 email не существует";
            return;
        }

        if(json.success) {
            document.querySelector(".err").innerHTML = json.message;
            return;
        }

        document.querySelector(".err").innerHTML = json.message || "Добавлено";
    }

    return (
        <div className="edit">
            <form onSubmit={handleEdit}>
                <h1>Права доступа</h1>
                <input type="email" name="filename" placeholder="E-mail пользователя"/>
                <input type="submit" value="Send"/>
                <div className="err"></div>
            </form>
            <Link to="/cabinet" style={{color: "white"}}><button>Back</button></Link>
        </div>
    )
}