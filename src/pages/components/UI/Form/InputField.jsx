import React from 'react';

function InputField(props) {
    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                type={props.type}
                name={props.name}
                className={`${!props.error && props.value ? "success" : props.error && "is-invalid"}`}
                onChange={props.onChange}
                placeholder={props.placeholder}
                value={props.value}
                autoComplete="off"
            />
        </div>
    );
}

export default InputField;