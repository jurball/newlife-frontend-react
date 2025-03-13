import React from 'react';

function ValidationError(props) {
    const styles = {
        textAlign: 'center'
    }
    return (
        <div className="box-error">
            {props.message && Object.entries(props.message).map(([key, value]) => (
                <p className="is-invalid-text" style={styles} key={key}>{value}</p>
            ))}
        </div>
    );
}

export default ValidationError;