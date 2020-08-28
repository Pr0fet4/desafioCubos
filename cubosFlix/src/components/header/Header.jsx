import React from 'react';

import "./Header.css"

export default function Header(props) {
    return (
        <div className="header" style={{cursor: "pointer"}} onClick={props.closeMovieInfo}>
           <h2>Movies</h2>
        </div>
    )
}