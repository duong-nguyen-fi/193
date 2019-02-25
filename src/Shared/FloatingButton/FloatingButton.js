import React from 'react'
import './FloatingButton.css'

function FloatingButton(props){
    return(
        <div className="dropdown float">
            <a className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown button
            </a>
            <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Regular link</a>
                <a className="dropdown-item active" href="#">Active link</a>
                <a className="dropdown-item" href="#">Another link</a>
            </div>
        </div>
    )
}

export default FloatingButton;