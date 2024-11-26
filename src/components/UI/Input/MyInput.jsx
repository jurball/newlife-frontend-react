import "./MyInput.module.css";

export default function MyInput({
    placeholder,
    type,
    name
}) {
    return (
        <input placeholder={placeholder} type={type} name={name}/>
    )
}