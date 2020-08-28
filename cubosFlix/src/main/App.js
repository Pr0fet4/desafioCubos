import React, { Component } from 'react';

import './App.css';

import Header from "../components/header/Header";
import Search from "../components/search/Search";
import SliceMovie from "../components/sliceMovie/SliceMovie";
import Pagination from "../components/pagination/Pagination";
import MovieInfo from "../components/movieInfo/MovieInfo"

class App extends Component {
    constructor() {
        super()
        this.state = {
            movies: [],
            searchTerm: '',
            totalResults: 0,
            currentPage: 1,
            currentMovie: null,
            genres: []
        }
        this.apiKey = process.env.REACT_APP_API
        
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`)
        .then(data => data.json())
        .then(data => {               
            // console.log(data);
            this.setState({ genres: data.genres })
        })
    }
  
    handleSubmit = (e) => {
        e.preventDefault();

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&language=pt-BR`)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                this.setState({ movies: [...data.results], totalResults: data.total_results })
            })
        

    }

    handleChange = (e) => {
        this.setState({ searchTerm: e.target.value })
    }

    nextPage = (pageNumber) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${pageNumber}`)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                this.setState({ movies: [...data.results], currentPage: pageNumber })
            })
    }

    viewMovieInfo = (id) => {
        const filteredMovie = this.state.movies.filter(movie => movie.id === id)

        const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null


        this.setState({ currentMovie: newCurrentMovie })
    }

    closeMovieInfo = () => {
        this.setState({ currentMovie: null })
    }

    render() {
        const numberPages = Math.floor(this.state.totalResults / 1000 + 2);
        console.log(this.state)
        return (            
            <div className="App">
                <Header closeMovieInfo={this.closeMovieInfo} />
                {this.state.currentMovie == null 
                ?
                 <div><Search handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
                <SliceMovie  genres={this.state.genres} viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}  /></div> 
                : 
                <MovieInfo genres={this.state.genres} currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo} />}
                
                {this.state.totalResults > 20 && this.state.currentMovie == null 
                ? 
                <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> 
                :
                ''}
            </div>
        )
    }

}

export default App;