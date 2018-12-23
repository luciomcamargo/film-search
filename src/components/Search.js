import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
          Title: 'The Shawshank Redemption'
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
          Title: 'The Godfather'
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
          Title: 'Forrest Gump'
        },
        {
          Poster:
            'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
          Title: 'Inception'
        }
      ]
    };
  }
  componentDidMount() {
    try {
      const state = window.localStorage.getItem('state');
      this.setState({ ...JSON.parse(state) });
    } catch (e) {}
  }
  componentDidUpdate() {
    window.localStorage.setItem('state', JSON.stringify(this.state));
  }
  handleChange = event => {
    this.setState({ search: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    axios

      .get(`http://www.omdbapi.com/?s=${this.state.search}&apikey=bbc0a2e7`)
      .then(res => {
        const data = res.data.Search.map(({ Poster, Title }) => ({
          Poster,
          Title
        }));
        this.setState(state => ({ data: data }));
      });
  };

  render() {
    const posters = this.state.data.map(
      film =>
        film.Poster !== 'N/A' && (
          <Link to={`/movie/${film.Title}`}>
            <img
              style={{ width: '20vw', height: '65vh', margin: '0.5em' }}
              src={`${film.Poster}`}
              alt={`${film.Title}`}
            />
          </Link>
        )
    );
    const formStyle = {
      display: 'flex'
    };

    return (
      <div style={{ background: '#aaafb7' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontFamily: 'Abril Fatface',
            paddingTop: '5vh'
          }}
        >
          <h1>Movie Database</h1>
        </div>
        <div className={formStyle}>
          <form
            className='form-row'
            onSubmit={this.handleSubmit}
            style={{ justifyContent: 'center', paddingBottom: '3vw' }}
          >
            <input
              style={{ width: '30vw' }}
              type='text'
              value={this.state.search}
              onChange={this.handleChange}
            />
            <button className='btn btn-primary'>Search</button>
          </form>
          <div style={{ marginLeft: '5vw' }}>{posters}</div>
        </div>
      </div>
    );
  }
}

export default Search;
