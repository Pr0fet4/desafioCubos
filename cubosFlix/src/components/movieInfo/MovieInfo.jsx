import React from 'react'
import Button from '../button/Button'
import './MovieInfo.css'

const linguagens = {
    en: "Inglês",
    pt: "Português",
    es: "Espanhol",
    it: "Italiano",
    ja: "Japonês",
    hi: "Hindu"
}

export class MovieInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: [],
            situacao: "",
            idioma: "",
            duracao: "",
            orcamento: "",
            receita: "",
            lucro: "",
        }
        this.apiKey = process.env.REACT_APP_API

        fetch(`https://api.themoviedb.org/3/movie/${this.props.currentMovie.id}?api_key=${this.apiKey}&language=pt-BR`)
            .then(data => data.json())
            .then(data => {
                console.log("data", data);
                this.setState({ situacao: data.status, idioma: data.original_language, duracao: data.runtime, orcamento: data.budget, receita: data.revenue, lucro: data.lucro })
            })


    }

    formatMoney(number) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number / 100)
    }

    formatHours(minutes) {
        const hours = parseInt(minutes / 60)
        const minutesRest = minutes % 60;

        return `${hours ? `${hours}h` : ""} ${minutesRest}m`
    }

    render(props) {
        // console.log(this.props)
        return (
            <div className="container-card">
                <div className="top-bar">
                    <p className="movie-title">{this.props.currentMovie.title}</p>
                    <p className="movie-release">{this.props.currentMovie.release_date.substring(5).split("-").concat(this.props.currentMovie.release_date.substring(0, 4)).join("/")}</p>
                </div>
                <div className="movie-content">
                    <div className="info-container">
                        <p className="title-syn-inf">Sinopse</p>
                        <div className="line"></div>
                        <p className="text-syn">{this.props.currentMovie.overview}</p>
                        <p className="title-syn-inf">Informações</p>
                        <div className="line"></div>
                        <div className="itens">
                            <div className="list">
                                <ul className="item-list">
                                    <li>
                                        <p>Situação</p>
                                        <p>{this.state.situacao}</p>
                                    </li>
                                    <li>
                                        <p>Idioma</p>
                                        <p>{linguagens[this.state.idioma]}</p>
                                    </li>
                                    <li>
                                        <p>Duração</p>
                                        <p>{this.state.duracao ? this.formatHours(this.state.duracao) : "?"}</p>
                                    </li>
                                    <li>
                                        <p>Orçamento</p>
                                        <p> {this.state.orcamento ? this.formatMoney(this.state.orcamento) : "?"}</p>
                                    </li>
                                    <li>
                                        <p>Receita</p>
                                        <p> {this.state.receita ? this.formatMoney(this.state.receita) : "?"}</p>
                                    </li>
                                    <li>
                                        <p>Lucro</p>
                                        <p>{this.state.orcamento && this.state.receita ? this.formatMoney((this.state.receita - this.state.orcamento)) : "?"}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-genres">
                                {this.props.genres.filter(genre => this.props.currentMovie.genre_ids.find(id => id === genre.id)).map(genre => <Button key={genre.name} genre={genre} />)}
                                <div className="align-circle">
                                    <div className="circle">
                                        <div className="circle2">
                                            <div className="popularity">
                                                <p>{this.props.currentMovie.popularity.toFixed(0)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-poster">
                        {this.props.currentMovie.poster_path == null ? <img src={"http://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg"} alt="Card Image" style={{ width: 360, height: 600 }} /> :
                            <img src={`http://image.tmdb.org/t/p/w185${this.props.currentMovie.poster_path}`} alt="Card Image" style={{ width: 360, height: 520 }} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieInfo;