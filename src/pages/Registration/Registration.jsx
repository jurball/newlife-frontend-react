import "./Registration.modules.css";
import Input from "../../components/UI/Input/MyInput";
import Button from "../../components/UI/Button/Button";

export default function Login() {
    function handleForm(e) {
        e.preventDefault();
        console.log(e.target.email.value);
        console.log(e.target.password.value);
        // console.log("login");
    }

    return (
        <form onSubmit={handleForm}>
            <h1>Форма регистрации</h1>
            <label htmlFor="">E-mail</label>
            <Input placeholder="E-mail" type="email" name="email"/>
            <label htmlFor="">Пароль</label>
            <Input placeholder="Пароль" type="password" name="password"/>
            <label htmlFor="">Подвердите пароль</label>
            <Input placeholder="Подвердите пароль" type="password" name="password"/>
            <label htmlFor="">Имя</label>
            <Input placeholder="Name" type="text" name="password"/>
            <Button text="Регистрация"/>
        </form>
    )

}