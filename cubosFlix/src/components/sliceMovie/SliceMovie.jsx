import React from 'react';

import Movie from '../movie/Movie'

export default function SliceMovie(props) {
    // console.log(props.genres)
    return (
        <div className="card-film">
            {
                props.movies.slice(0, 5).map((movie, i) => {
                    return (
                        <Movie key={i} viewMovieInfo={props.viewMovieInfo} movie={movie} genres={props.genres}/>
                    )
                })
            }
            
        </div>
    )
}