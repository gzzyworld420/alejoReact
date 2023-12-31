import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import './ViewAll.css'

class ViewAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            page: 1,
            estrenoMovies: [],
            mensaje: '',
            valor: '',
            loader: true,
            moviesInicial: [],
            cargarMas: true
        };
    };

    noSubmit(event) {
        event.preventDefault();
    }

    controlarCambios(event) {

        this.setState({
            valor: event.target.value,
            cargarMas: false
        },() => console.log(event.target.value))

        let peliculasFiltradas = this.state.moviesInicial.filter(pelicula => pelicula.title.toLowerCase().includes(event.target.value.toLowerCase()));
        this.setState({
            estrenoMovies: peliculasFiltradas,
        })

        if(event.target.value === ''){
            this.setState({
                cargarMas: true
            })
        }
    }

    verMas() {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=1845c94396255a256363182ed898e8fc&language=en-US=${this.state.page}`)
            .then(response => response.json())
            .then(data => this.setState({
                estrenoMovies: this.state.estrenoMovies.concat(data.results),
                moviesInicial: this.state.moviesInicial.concat(data.results)
            }))
            .catch(error => console.log(error));
        this.setState({ page: this.state.page + 1 })


    }

    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=1845c94396255a256363182ed898e8fc&language=en-US=${this.state.page}`)
            .then(response => response.json())
            .then(data => this.setState({
                estrenoMovies: data.results,
                moviesInicial: data.results,
                page: this.state.page + 1,
                loader: false
            }))
            .catch(error => console.log(error));


    }

    render() {
        return (
            <main>
                <div className="buscador-home">
                    <h2>Filtro:</h2>
                    <form onSubmit={(event) => this.noSubmit(event)}>
                        <input type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.valor} />
                        <button type='submit'><i className="fa-solid fa-filter"></i></button>
                    </form>
                    <p>{this.state.mensaje}</p>
                </div>
                {this.state.loader === true ?
                    <img src='../../images/loader.gif' alt="Loader"/> :
                    <React.Fragment>
                        <h2 className='title-home'>Upcoming Movies</h2>

                        <section className='cardContainer'>
                            {this.state.estrenoMovies.map((oneMovie, idx) => <Card key={oneMovie + idx} datosPelicula={oneMovie} />)}
                        </section>
                        {this.state.cargarMas === true?
                        <div className='div-vermas'>
                            <button className='load-more' onClick={() => this.verMas()}>Load More</button>
                        </div>: null}
                    </React.Fragment>
                }
            </main>
        )
    }
}

export default ViewAll;