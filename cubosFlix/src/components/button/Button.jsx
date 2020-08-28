import React from 'react';

import './Button.css'

export default function Button(props) {
    return (
        <div className="butao-area">
            <div className="butao">
                {props.genre.name}
            </div>
        </div>
    );
}