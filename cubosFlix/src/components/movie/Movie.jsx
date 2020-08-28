import React from 'react'
import Button from '../button/Button'

import './Movie.css'

export default function Movie(props) {
    return (
        <div className="content">
        {console.log(props)}
            <div className="card">
                <div className="card-image" style={{cursor: "pointer"}} onClick={() => props.viewMovieInfo(props.movie.id)}>
                    {
                        props.movie.poster_path == null ?
                            <img src={`http://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`} alt="card image" style={{ width: 260, height: 400 }} />
                            : <img src={`http://image.tmdb.org/t/p/w185${props.movie.poster_path}`} alt="card image" style={{ width: 260, height: 400 }} />
                    }
                </div>
                <div className="text-content">
                    <div className="title-bar" style={{cursor: "pointer"}} onClick={() => props.viewMovieInfo(props.movie.id)}>
                        <p>{props.movie.title}</p>
                        <div className="score-circle">
                            <div className="score-circle2">
                                <div className="popularity">
                                    {props.movie.popularity.toFixed(0)}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="realese">
                        <p>{props.movie.release_date.substring(5).split("-").concat(props.movie.release_date.substring(0, 4)).join("/")}</p>
                    </div>
                    <div className="synopsis">
                        <p>{props.movie.overview}</p>
                    </div>
                    <div className="card-genres">
                        {props.genres.filter(genre => props.movie.genre_ids.find(id => id === genre.id)).map(genre => <Button key={genre.name} genre={genre} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}