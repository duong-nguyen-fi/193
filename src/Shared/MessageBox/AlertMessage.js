import React from 'react';
import './AlertMessage.css'

function AlertMessage(props) {
    return(
        <div className="alert">
            <span className="closebtn" onClick={props.click}>&times;</span> 
            <strong>{props.message}</strong> 
        </div>
    );
}

export default AlertMessage;