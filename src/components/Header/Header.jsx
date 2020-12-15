import React from 'react'
import "./Header.css"

export default function Header(props) {
    return (
        <div className="header">
            <h1>Pro Jobs</h1>

            <div className="search">
                <div className="inputs">
                    <p>Description</p>
                    <input type="text" name="description" value={props.description} placeholder="Description" onChange={props.handleFormChange} />
                </div>
                <div className="inputs">
                    <p>Location</p>
                    <input type="text" name="location" placeholder="Location" value={props.location} onChange={props.handleFormChange} />
                </div>
                <div className="inputs">
                    <input type="checkbox" name="fullTime" onClick={props.handleCheckBox} id="checkbox" /> Only Full Time
            </div>
            </div>
        </div>
    )
}
