import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Movie.css';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      movie: {},
      trailer: ''
    };
  }
  componentDidMount() {
    axios
      .get(
        `http://www.omdbapi.com/?t=${
          this.props.match.params.id
        }&apikey=bbc0a2e7`
      )
      .then(res => {
        const movie = res.data;
        this.setState(state => ({ movie: movie }));
      });
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this
          .props.match.params.id +
          'trailer'}&key=AIzaSyDedt0diA_SmrieWAl131sjGuecBVr6u8s`
      )
      .then(res => {
        const trailer = res.data;
        this.setState(state => ({ trailer: trailer.items[0].id.videoId }));
        console.log(trailer.items[0].id.videoId);
      });
  }

  render() {
    const { movie } = this.state;

    return (
      <div style={{ background: '#aaafb7' }}>
        <div className='head'>
          <Link to={`/`}>
            <h3>Back</h3>
          </Link>

          <h1>{movie.Title}</h1>
        </div>

        <div style={{ display: 'flex' }}>
          <div className='container'>
            <img
              className='image'
              src={`${movie.Poster}`}
              alt={`${movie.Title}`}
            />
            <div className='middle'>
              <iframe
                title={`${movie.Title}`}
                width='460'
                height='440'
                src={`https://www.youtube.com/embed/${this.state.trailer}`}
                allow='fullscreen'
              />
              <div className='text'>{movie.Title}</div>
            </div>
          </div>

          <div className='info'>
            <div style={{ marginLeft: '8vw' }}>
              <h4>{movie.Plot}</h4>
            </div>

            <div style={{ paddingLeft: '8vw' }}>
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
          </div>
        </div>
      </div>
    );
  }
}
