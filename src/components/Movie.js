import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Movie.css';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      trailer: ''
    };
  }
  async componentDidMount() {
    const firstRequest = await axios.get(
      `http://www.omdbapi.com/?i=${
        this.props.match.params.id
      }&plot=full&apikey=bbc0a2e7`
    );
    const secondRequest = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${firstRequest
        .data.Title +
        firstRequest.data.Year +
        'trailer'}&key=AIzaSyDedt0diA_SmrieWAl131sjGuecBVr6u8s`
    );

    this.setState(state => ({ movie: firstRequest.data }));
    if (
      secondRequest.data.items === undefined ||
      secondRequest.data.items.length === 0
    ) {
      this.setState(state => ({
        trailer: ''
      }));
    } else {
      this.setState(state => ({
        trailer: secondRequest.data.items[0].id.videoId
      }));
    }
  }

  render() {
    const { movie } = this.state;

    return (
      <div className='container'>
        <header>
          <Link to={`/`}>
            <p>Back</p>
          </Link>
          {movie.Title}
        </header>
        <main className='container'>
          <img
            className='image'
            src={`${movie.Poster}`}
            alt={`${movie.Title}`}
          />
          {typeof movie.Poster !== 'undefined' && (
            <iframe
              className='middle'
              title={`${movie.Title}`}
              width='460'
              height='440'
              src={`https://www.youtube.com/embed/${this.state.trailer}`}
              allow='fullscreen'
            />
          )}
        </main>
        <aside>
          <div className='info'>
            <h5>{movie.Plot}</h5>

            <h5>Director : {movie.Director}</h5>
            <h5>Actors : {movie.Actors}</h5>
            <h6>Release Date: {movie.Released}</h6>
            <h6>Genre : {movie.Genre}</h6>
            <h6>Awards : {movie.Awards}</h6>

            <h5>
              <i className='fas fa-arrow-left fa-2x' /> Hover over poster to
              watch trailer!
            </h5>
          </div>
        </aside>
      </div>
    );
  }
}
