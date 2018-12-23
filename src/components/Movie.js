import React, { Component } from 'react';
import axios from 'axios';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      movie: {}
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
        console.log(this.state.movie);
      });
  }

  render() {
    const { movie } = this.state;
    const posterStyle = {
      marginLeft: '5vw',
      marginBottom: '3vw'
    };
    const infoStyle = {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'column',
      margin: '1vw',
      fontFamily: 'Montserrat'
    };

    return (
      <div style={{ background: '#aaafb7' }}>
        <h1
          style={{
            textAlign: 'center',
            fontFamily: 'Abril Fatface',
            padding: '3vh'
          }}
        >
          {movie.Title}
        </h1>
        <div style={{ display: 'flex' }}>
          <div style={posterStyle}>
            <img
              style={{ width: '55vh' }}
              src={`${movie.Poster}`}
              alt={`${movie.Title}`}
            />
          </div>

          <div style={infoStyle}>
            <div style={{ margin: '4vw' }}>
              <h4>{movie.Plot}</h4>
            </div>

            <div style={{ padding: '4vw' }}>
              <h5>Director : {movie.Director}</h5>
              <h5>Actors : {movie.Actors}</h5>
              <h6>Release Date: {movie.Released}</h6>
              <h6>Genre : {movie.Genre}</h6>
              <h6>Awards : {movie.Awards}</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
