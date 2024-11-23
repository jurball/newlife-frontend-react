import "./Registration.module.css";

export default function Registration() {
    function handleForm(e) {
        e.preventDefault();
        console.log(e.target.email.value);
        console.log(e.target.password.value);
    }

    return (
        <form>
            <button>Click</button>
        </form>
    )
}