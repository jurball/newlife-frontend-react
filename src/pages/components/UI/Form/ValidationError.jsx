import React from 'react';

function ValidationError(props) {
    return (
        <div className="box-error">
            {props.message && Object.entries(props.message).map(([key, value]) => (
                <p className="is-invalid-text" key={key}>{value}</p>
            ))}
        </div>
    );
}

export default ValidationError;