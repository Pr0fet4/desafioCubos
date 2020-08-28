import React from 'react';

import './Search.css';

export default function Search(props) {
    return(
        <div className="search">
            <form action="" onSubmit={props.handleSubmit}>
                <input 
                type="text" 
                className="selected"
                placeholder="Busque um filme por nome, ano ou gênero..." 
                onChange={props.handleChange}/>
            </form>
            
        </div>
    )
}