import React from 'react'

import './Pagination.css'

export default function Pagination(props) {
    const pageLinks = []

    for (let i = 1; i <= props.pages + 1; i++) {
        let active = props.currentPage === i ? 'active active2' : '';

        pageLinks.push(<li className={`pages ${active}`} key={i} onClick={() => props.nextPage(i)}><a href="#">{i}</a></li>)
    }

    return (
        <div className="container">
            <div className="row">
                <ul className="pagination">
                    {pageLinks}
                </ul>
            </div>
        </div>
    )
}